import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BaseDropdown = ({ data, selectedValue, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View testID="base-dropdown">
      <TouchableOpacity
        testID="dropdown-button"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text>{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View testID="dropdown-options">
          {data.map((item) => (
            <TouchableOpacity
              key={item.value}
              testID={`dropdown-option-${item.value}`}
              onPress={() => {
                onValueChange(item.value);
                setIsOpen(false);
              }}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default BaseDropdown;
