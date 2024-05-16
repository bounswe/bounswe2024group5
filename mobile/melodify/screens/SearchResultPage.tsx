import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";

const ResultItem = ({ item, type }) => (
  <View style={styles.resultContainer}>
    {type === "posts" && item.media_url ? (
      <Image source={{ uri: item.media_url }} style={styles.image} />
    ) : type === "wiki" && item.imageUrl ? (
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    ) : null}
    <View style={styles.textContainer}>
      {type === "wiki" ? (
        <>
          <Text style={styles.title}>{item.label}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.author}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </>
      )}
    </View>
  </View>
);

const SearchResultPage = ({ route, navigation }) => {
  const { token } = useAuth();
  const { searchResults } = route.params;
  const [selectedTab, setSelectedTab] = useState("Semantic Search");
  const [wikiResults, setWikiResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchWikiImages = async () => {
      const wikiDataWithImages = await Promise.all(
        searchResults.wiki.map(async (item) => {
          const url = `https://www.wikidata.org/wiki/Special:EntityData/${item.id}.json`;
          try {
            const response = await fetch(url);
            const data = await response.json();
            const entity = data.entities[item.id];
            let imageUrl = null;

            if (entity.claims && entity.claims.P18) {
              const fileName = entity.claims.P18[0].mainsnak.datavalue.value;
              imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
            }

            return { ...item, imageUrl };
          } catch (error) {
            console.error("Error fetching image for Wikidata item:", error);
            return item;
          }
        })
      );
      setWikiResults(wikiDataWithImages);
      setIsLoading(false);
    };

    fetchWikiImages();
  }, [searchResults.wiki]);

  const handleSearch = async () => {
    console.log("Searching for:", inputValue);
    Keyboard.dismiss();
    setIsLoading(true);

    const fullUrl = `http://34.118.44.165/api/search?query=${encodeURIComponent(inputValue)}`;

    try {
      const response = await fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);

      navigation.navigate("SearchResultPage", { searchResults: data });
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search something else"
            placeholderTextColor="#ccc"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={[
              styles.iconStyle,
              {
                width: 44,
                height: 44,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Relevant Posts" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Relevant Posts")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Relevant Posts" && styles.selectedTabText,
            ]}
          >
            Relevant Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Semantic Search" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Semantic Search")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Semantic Search" && styles.selectedTabText,
            ]}
          >
            Semantic Search
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "Semantic Search" ? (
        isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={wikiResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ResultItem item={item} type="wiki" />}
          />
        )
      ) : searchResults.posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Relevant Posts found.</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ResultItem item={item} type="posts" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#111927",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  goBack: {
    padding: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 10,
  },
  iconStyle: {
    position: "absolute",
    right: 5,
    top: 2,
    backgroundColor: "transparent",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "gray",
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#192f6a",
  },
  selectedTab: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedTabText: {
    color: "black",
  },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#111",
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default SearchResultPage;
