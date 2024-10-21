import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface BaseDropdownProps {
  data: Array<{ label: string; value: string }>;
  placeholder: string;
  styleOverrides: any;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const BaseDropdown: React.FC<BaseDropdownProps> = ({
  data,
  placeholder,
  styleOverrides,
  selectedValue,
  onValueChange,
}) => {
  const [value, setValue] = useState<string | null>(selectedValue);

  // Sync with external selectedValue prop
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  return (
    <Dropdown
      style={[styles.dropdown, styleOverrides?.dropdown]}
      placeholderStyle={[
        styles.placeholderStyle,
        styleOverrides?.placeholderStyle,
      ]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        styleOverrides?.selectedTextStyle,
      ]}
      iconStyle={[styles.iconStyle, styleOverrides?.iconStyle]}
      itemTextStyle={[styles.itemTextStyle, styleOverrides?.itemTextStyle]}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onValueChange(item.value); // Notify parent of value change
      }}
    />
  );
};

export default BaseDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#5b0996",
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 14,
  },
});
