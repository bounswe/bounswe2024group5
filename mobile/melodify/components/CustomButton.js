import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#ffffff',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { height: 2 },
      marginVertical: 10,
    },
    buttonText: {
      color: '#3b5998',
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default CustomButton;