// SearchWordsScreen.tsx
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back and search icons
import { useNavigation } from "@react-navigation/native"; // For navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HostUrlContext from "../app/HostContext"; // Import HostUrlContext
import { useAuth } from "./AuthProvider"; // Import useAuth

type RootStackParamList = {
  SearchResults: { keyword: string };
  // Add other routes if necessary
};

type SearchWordsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SearchResults"
>;

const SearchWordsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const navigation = useNavigation<SearchWordsScreenNavigationProp>();
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  /**
   * Handles the search action when the user submits the search term.
   */
  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm.length === 0) {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }
    Keyboard.dismiss();
    navigation.navigate("SearchResults", { keyword: trimmedTerm });
  };

  /**
   * Fetches autocomplete suggestions based on the current search term.
   */
  useEffect(() => {
    if (!showSuggestions) return;

    const currentTerm = searchTerm.trim();

    if (currentTerm === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsFetchingSuggestions(true);
      try {
        const response = await fetch(
          `${hostUrl}/api/autocomplete?prefix=${encodeURIComponent(
            currentTerm
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        const contentType = response.headers.get("content-type");

        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const data = await response.json();
          setSuggestions(data);
        } else if (response.status === 401) {
          // Handle unauthorized access
          Alert.alert(
            "Unauthorized",
            "Your session has expired. Please log in again."
          );
          // Optionally, navigate to the login screen
          // navigation.navigate("Login");
          setSuggestions([]);
          setShowSuggestions(false);
        } else {
          // Attempt to parse as text for better error handling
          const text = await response.text();
          console.warn(`Unexpected response format: ${text}`);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsFetchingSuggestions(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce API calls by 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, showSuggestions, hostUrl, token]);

  /**
   * Handles the selection of a suggestion from the dropdown.
   * @param suggestion The selected suggestion.
   */
  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    Keyboard.dismiss(); // Optionally dismiss the keyboard after selection
    navigation.navigate("SearchResults", { keyword: suggestion });
  };

  /**
   * Handles changes in the search input field.
   * @param text The new text input.
   */
  const handleSearchInputChange = (text: string) => {
    setSearchTerm(text);
    const trimmedText = text.trim();
    if (trimmedText === "") {
      setShowSuggestions(false);
      setSuggestions([]);
    } else {
      setShowSuggestions(true);
    }
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

      {/* Search Input with Autocomplete */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for words..."
          value={searchTerm}
          onChangeText={handleSearchInputChange}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#6a0dad" />
        </TouchableOpacity>

        {/* Loading Indicator for Suggestions */}
        {isFetchingSuggestions && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}
      </View>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                onPress={() => handleSuggestionSelect(suggestion)}
                style={styles.suggestionItem}
              >
                <Text>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
    position: "relative",
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
  suggestionsContainer: {
    marginTop: 10, // Space between search input and suggestions
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 1,
    maxHeight: 150,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  loadingIndicator: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 8 : 6,
  },
});

export default SearchWordsScreen;
