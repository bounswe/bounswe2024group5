import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import Post from "../components/Post";
import pp2Image from "../assets/profile_pic.png";
import contentImage from "../assets/content.jpg";

const mockPost = {
  id: "1",
  // pp: require("../assets/profile_pic.png"),
  author: "The Lumineers",
  created_at: "2 hours ago",
  text: "Hey everyone! We're excited to announce our new album coming out next month. Stay tuned for more updates!",
  imageURL: require("../assets/content.jpg"),
  tags: [
    "#concert",
    "#guitar"
  ],
  likes: 77,
};


const ResultItem = ({ item }) => {
  return (
    <View style={styles.resultContainer}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : null}
      <View
        style={[styles.textContainer, { marginTop: item.imageUrl ? 0 : 0 }]}
      >
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const FeedPage = ({ navigation }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchMade, setsearchMade] = useState(false);
  const [posts, setPosts] = useState([mockPost, mockPost, mockPost]);

  const fetchImageData = async (entityId) => {
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&format=json&props=claims`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const claims = data.entities[entityId].claims;
      const imageProperty = claims.P18;

      if (imageProperty) {
        const imageFilename = imageProperty[0].mainsnak.datavalue.value;
        const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
          imageFilename
        )}`;
        return imageUrl;
      }
    } catch (error) {
      console.error("Failed to fetch image data:", error);
    }
    return null;
  };

  const handleSearch = async () => {
    console.log("Searching for:", inputValue);
    Keyboard.dismiss();
    setIsLoading(true);
    setsearchMade(true);

    const fullUrl = `http://34.118.44.165/api/search?query=${encodeURIComponent(
      inputValue
    )}`;
   
    try {
      const response = await fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Received data:", data);
      console.log(data.search[0].display);

      if (!response.ok) throw new Error(data.message || "Failed to fetch data");

      if (!Array.isArray(data.search))
        throw new TypeError("Received data under 'search' is not an array");

      setResults(
        await Promise.all(
          data.search.map(async (item) => {
            const imageUrl = await fetchImageData(item.id);
            return {
              description: item.description,
              imageUrl: imageUrl,
            };
          })
        )
      );
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
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
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.loading}
        />
      ) : searchMade && results.length === 0 ? (
        <Text style={styles.noResultsText}>No results found.</Text>
      ) : (
        <View style={styles.container2}>
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ResultItem item={item} />}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Post postData={item} />}
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
    alignSelf: "center",
    width: "100%",
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 10,
    marginBottom: 0,
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    right: 5,
    top: 2,
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
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FeedPage;
