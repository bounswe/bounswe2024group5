// SearchWordsScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back and search icons
import { useNavigation } from "@react-navigation/native"; // For navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SearchResults: { keyword: string };
};

const SearchWordsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm.length === 0) {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }
    Keyboard.dismiss();
    navigation.navigate("SearchResults", { keyword: trimmedTerm });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for words..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#6a0dad" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#6a0dad",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f3e8ff",
  },
  searchButton: {
    marginLeft: 10,
  },
});

export default SearchWordsScreen;
