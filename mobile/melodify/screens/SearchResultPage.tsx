import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ResultItem = ({ item }) => (
  <View style={styles.resultContainer}>
    {item.imageUrl ? (
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    ) : null}
    <View style={styles.textContainer}>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const SearchResultPage = ({ route, navigation }) => {
  const { searchResults } = route.params;
  const { registeredUser } = route.params;
  const [selectedTab, setSelectedTab] = useState("Semantic Search");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
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
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ResultItem item={item} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Relevant Posts found.</Text>
        </View>
      )}
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
  goBack: {
    marginBottom: 20,
    padding: 10,
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
  description: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
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
