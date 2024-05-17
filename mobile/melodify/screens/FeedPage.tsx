import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import Post from "../components/Post";
import { useFocusEffect } from "@react-navigation/native";

const FeedPage = ({ route, navigation }) => {
  const { registeredUser } = route.params;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    console.log("Searching for:", inputValue);
    Keyboard.dismiss();
    setIsLoading(true);

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);

      navigation.navigate("SearchResultPage", {
        registeredUser: registeredUser,
        searchResults: data,
      });
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = useCallback(() => {
    console.log("Getting posts with token: ", token);
    fetch(`http://34.118.44.165/api/feed?page=0&limit=1000`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPosts(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  const handlePostPress = (post) => {
    navigation.navigate("SeePostScreen", {
      post,
      username: registeredUser.username,
    });
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
      ) : null}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Post postData={item} onPress={() => handlePostPress(item)} />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("CreatePostScreen", {
            registeredUser: registeredUser,
          })
        }
      >
        <Ionicons name="add" size={24} color="#111927" />
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
    marginTop: 20,
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
    marginBottom: 20,
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
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#ffffff",
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
});

export default FeedPage;
