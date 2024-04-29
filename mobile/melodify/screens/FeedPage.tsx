import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeedPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Melodify</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#ccc"
        />
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={styles.iconStyle}
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.title}>Feed Page</Text>
        <Text style={styles.content}>Welcome to the Feed!</Text>
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
