import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeedPage = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const url = "https://wikidata.org/w/api.php";
    const params = {
      action: "wbsearchentities",
      format: "json",
      language: "en",
      search: inputValue,
      props: "info|claims", // Include claims to get image info directly
      uselang: "en",
    };
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      const promises = data.search.map(async (item) => {
        const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${item.id}&format=json&props=claims`;
        const entityResponse = await fetch(entityUrl);
        const entityData = await entityResponse.json();

        let imageUrl = undefined;
        if (entityData.entities[item.id].claims.P18) {
          const imageFilename =
            entityData.entities[item.id].claims.P18[0].mainsnak.datavalue.value;
          imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
            imageFilename
          )}`;
        }
        return { description: item.description, imageUrl: imageUrl };
      });
      const results = await Promise.all(promises);
      setResults(results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Melodify</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#ccc"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onSubmitEditing={handleSearch}
        />
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={styles.iconStyle}
        />
      </View>
      <View style={styles.container2}>
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              {item.imageUrl && (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              )}
              <Text style={styles.description}>• {item.description}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePostScreen")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#111927",
  },
  mainTitle: {
    fontWeight: "bold",
    marginTop: 30,
    alignSelf: "flex-start",
    fontSize: 40,
    marginBottom: 20,
    color: "white",
  },
  searchContainer: {
    alignSelf: "flex-start",
    width: "100%",
    padding: 20,
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    right: 30,
    top: 33,
    backgroundColor: "transparent",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  description: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  resultContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#192f6a",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 2 },
  },
});

export default FeedPage;
