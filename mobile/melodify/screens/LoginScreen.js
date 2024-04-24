import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';

const LoginScreen = ({ navigation }) => {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ccc" secureTextEntry />
          <View style={styles.buttonContainer}>
            <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
            <CustomButton title="Login" onPress={() => navigation.navigate('Feed')} />
          </View>
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '80%',
    },
});

export default LoginScreen;
