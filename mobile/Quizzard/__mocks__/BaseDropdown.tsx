import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BaseDropdown = ({ data, selectedValue, onValueChange, placeholder }) => {
  React.useEffect(() => {
    // Automatically select multiple choice type
    onValueChange("multipleChoice");
  }, [onValueChange]);

  return (
    <View testID="base-dropdown">
      <TouchableOpacity testID="question-type-dropdown" onPress={() => null}>
        <Text>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseDropdown;
