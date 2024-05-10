import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={["#111927", "#192f6a", "#111927"]}
    style={styles.background}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GradientBackground;
