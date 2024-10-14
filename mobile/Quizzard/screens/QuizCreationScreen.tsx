import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropdownComponent from '../components/QuestionTypeDropdown';  // Adjust path if necessary



import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const QuizCreationPage = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };


  // Function to handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Add a new question to the questions array
  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', choices: { A: '', B: '', C: '', D: '' }, type: 'Eng -> Tr' }]);
  };

  const handleCreateQuiz = () => {
    console.log('Quiz Created:', quizTitle, quizDescription, questions);
    navigation.goBack(); // Navigate back to the home page after quiz creation
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the home page
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'title') {
      updatedQuestions[index].title = value;
    } else if (field === 'type') {
      updatedQuestions[index].type = value;
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome}>
            <Text style={styles.appName}>Quizzard</Text>
         </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Untitled Quiz"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      {/* Image Upload Box */}
      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
        <Text style={styles.imageUploadText}>
          {image ? 'Image Uploaded' : '+ Upload Image'}
        </Text>
      </TouchableOpacity>

      {/* Description Input */}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter quiz description..."
        value={quizDescription}
        onChangeText={setQuizDescription}
        multiline
      />

      {/* Render all question boxes */}
      {questions.map((question, index) => (
        <View key={index} style={styles.questionBox}>
          {/* Header with Title and Dropdown */}
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.questionTitle}
              placeholder="Question Title"
              value={question.title}
              onChangeText={(text) => updateQuestion(index, 'title', text)}
            />
            <View style={styles.dropdownContainer}>
                <DropdownComponent />
            </View>
          </View>

          {/* Answer Choices */}
          {['A', 'B', 'C', 'D'].map((option) => (
            <TextInput
              key={option}
              style={styles.choiceInput}
              placeholder={`Choice ${option}`}
              value={question.choices[option]}
              onChangeText={(text) => updateQuestion(index, option, text)}
            />
          ))}
        </View>
      ))}

      {/* + Question Button */}
      <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
        <Text style={styles.addQuestionButtonText}>+ Question</Text>
      </TouchableOpacity>

      {/* Bottom Cancel and Submit Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleCreateQuiz}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad', // Dark purple color for the app name
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageUploadBox: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Rounded corners for cleaner look
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#888',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 100,
  },
  questionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionTitle: {
    flex: 1,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  dropdownContainer: {
    width: '42%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 14,
  },
  dropdown: {
    height: 40,
  },
  choiceInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  addQuestionButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  addQuestionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuizCreationPage;
