// components/DifficultyLevelDropdown.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import BaseDropdown from "./BaseDropdown";

interface DifficultyLevelDropdownProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const difficultyData = [
  { label: "A1", value: "a1" },
  { label: "A2", value: "a2" },
  { label: "B1", value: "b1" },
  { label: "B2", value: "b2" },
  { label: "C1", value: "c1" },
  { label: "C2", value: "c2" },
];

const DifficultyLevelDropdown: React.FC<DifficultyLevelDropdownProps> = ({
  selectedValue,
  onValueChange,
}) => {
  const customStyles = {
    dropdown: {
      color: "#6d28d9",
      height: 40,
      width: "100%",
      margin: 4,
      borderWidth: 1,
      borderColor: "#6d28d9",
      borderRadius: 8,
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    placeholderStyle: {
      fontSize: 14,
      color: "#999",
    },
    selectedTextStyle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    labelStyle: {
      fontSize: 14,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  };

  return (
    <View style={styles.container}>
      <BaseDropdown
        data={difficultyData}
        placeholder="Select level"
        styleOverrides={customStyles}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default DifficultyLevelDropdown;
