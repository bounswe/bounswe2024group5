import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#4c669f', '#3b5998', '#192f6a']}
    style={styles.background}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientBackground;
