import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";

const CustomModal = ({ visible, message, onClose }) => {
  const isSuccess = message.includes("successful");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons 
            name={isSuccess ? "checkmark-circle" : "alert-circle"} 
            size={50} 
            color={isSuccess ? "#ddd6fe" : "#ef4444"}
          />
          <Text style={styles.modalText}>{message}</Text>
          <CustomButton 
            title="Close" 
            onPress={onClose}
            style={{
              backgroundColor: "#5b21b6",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
            textStyle={{
              color: "#ddd6fe",
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2e1065",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    color: "#ddd6fe",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
  },
});

export default CustomModal;