import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BaseDropdown = ({ data, selectedValue, onValueChange, placeholder }) => {
  // Auto-select multiple choice type on mount
  React.useEffect(() => {
    onValueChange("multipleChoice");
  }, []);

  return (
    <View testID="base-dropdown">
      <TouchableOpacity testID="question-type-dropdown" onPress={() => null}>
        <Text>Multiple Choice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseDropdown;
