import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back icon
import { useNavigation } from "@react-navigation/native"; // For navigation

const SearchWordsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation(); // Hook for navigation

  const wordMeanings = {
    example: [
      "A representative form or pattern",
      "A typical instance",
      "A problem or exercise designed to illustrate a rule",
      "A punishment designed to serve as a warning to others",
    ],
    // Add more words and their meanings...
  };

  const filteredWords = Object.keys(wordMeanings).filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for words..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredWords}
        renderItem={({ item }) => (
          <View style={styles.wordContainer}>
            <Text style={styles.word}>{item}</Text>
            {wordMeanings[item].map((meaning, index) => (
              <Text key={index} style={styles.meaning}>
                {index + 1}. {meaning}
              </Text>
            ))}
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  wordContainer: {
    marginBottom: 10,
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meaning: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default SearchWordsScreen;
