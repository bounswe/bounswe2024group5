import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const CustomModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <CustomButton title="Close" onPress={onClose} />
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
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "#22005d",  // lighter purple background for the modal
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",  // white text
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonClose: {
    backgroundColor: "#22005d",  // dark purple button background
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",  // white button text
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
