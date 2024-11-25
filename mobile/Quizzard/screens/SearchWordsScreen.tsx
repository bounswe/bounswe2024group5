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
          )}&language=english`,
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
          console.log(`Unauthorized: ${response.status}.`);
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
