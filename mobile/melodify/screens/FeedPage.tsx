import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from "../assets/example.json"; // replace with the path to your JSON file


const FeedPage = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [descriptions, setDescriptions] = useState([]);


  const handleSearch = async () => {
    try {
      /*
      const response = await fetch(`localhost:8080/search?keyword=${inputValue}`);
      const data = await response.json();
      console.log(data);
      */
      const descriptions = data.search.map(item => item.description);
      console.log(descriptions);
      setDescriptions(descriptions);
    } catch (error) {
      console.error(error);
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
          onChangeText={text => setInputValue(text)}
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
          data={descriptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.description}>• {item}</Text>}
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
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  content: {
    fontSize: 18,
    color: "white",
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
