// HomeScreen.tsx
import React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import BaseLayout from './BaseLayout';
import QuizViewComponent from '../components/QuizViewComponent';  // Adjust the path if necessary
import mockQuizData from '../mockdata/mockQuizData';  // Adjust the path if necessary
import DropdownComponent from '../components/DifficultyLevelDropdown';  // Adjust path if necessary

const HomePage = ({ navigation }) => {
  const navigateToQuizCreation = () => {
    navigation.navigate('QuizCreation');
  };

  const renderOtherQuizzes = ({ item }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent quiz={item} />
    </View>
  );

  return (
    // <SafeAreaView style={styles.safeArea}> 
    <BaseLayout navigation={navigation}>
      {/* Quizzes For You Section */}
      <View style={styles.quizzesForYouHeader}>
        <Text style={styles.sectionTitle}>Quizzes For You</Text>
        <TouchableOpacity style={styles.addQuizButton} onPress={navigateToQuizCreation}>
          <Text style={styles.addQuizButtonText}>+ Add Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontally Scrollable Quizzes For You */}
      <View style={styles.quizSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quizScroll}>
          {mockQuizData.map((quiz, index) => (
            <QuizViewComponent key={index} quiz={quiz} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.otherQuizzesHeader}>
        <Text style={styles.sectionTitle}>Other Quizzes</Text>
        <View style={styles.dropdownContainer}>
                <DropdownComponent />
            </View>
      </View>

      {/* Other Quizzes Section */}
      <View style={styles.otherQuizzesContainer}>
        <View style={styles.sectionDivider} />
        <FlatList
          data={mockQuizData}
          renderItem={renderOtherQuizzes}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}  // To show two items per row
          contentContainerStyle={styles.quizGrid}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </BaseLayout> 
    );
};

const styles = StyleSheet.create({
  quizzesForYouHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 380,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContainer: {
    width: '42%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 14,
  },
  addQuizButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexShrink: 0,
  },
  addQuizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  quizSection: {
    marginBottom: 0,
    height: '50%',
  },
  quizScroll: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  otherQuizzesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'stretch',
  },
  otherQuizzesContainer: {
    flexGrow: 1,
    // marginTop: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  quizGrid: {
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quizWrapper: {
    flex: 1,
    padding: 10,
  },
});

export default HomePage;
