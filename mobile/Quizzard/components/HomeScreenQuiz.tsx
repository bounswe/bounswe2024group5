import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window"); // Get screen width

const CustomCard = ({ imageSource, title, eloScore, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.eloScore}>{eloScore}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    width: width * 0.9, // 90% of screen width
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
    margin: 10,
  },
  imageContainer: {
    width: "100%",
    position: "relative", // Allows for absolute positioning inside this container
  },
  image: {
    width: "100%", // Make the image fill the width of the card
    height: 100, // Adjust height as needed
    borderRadius: 10,
  },
  eloScore: {
    position: "absolute",
    top: 10, // 10px from the top
    left: 10, // 10px from the left
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for readability
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10, // Spacing between the image and the title
  },
});
