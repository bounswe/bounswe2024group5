import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';

const RegisterScreen = ({ navigation }) => {
    return (
      <GradientBackground>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Assumes you are using React Navigation
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Register</Text>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" />
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ccc" secureTextEntry />
          <CustomButton title="Register" onPress={() => console.log('Register Pressed')} />
        </View>
      </GradientBackground>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 50, // Added padding to ensure space for the back button
    },
    backButton: {
      position: 'absolute',
      top: 30,
      right: 30,
      backgroundColor: 'white', 
      borderRadius: 15,
      width: 30, 
      height: 30,
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    backButtonText: {
      color: '#3b5998', 
      fontSize: 16, 
      fontWeight: 'bold', 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
    },
    input: {
      width: '80%',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
});

export default RegisterScreen;
