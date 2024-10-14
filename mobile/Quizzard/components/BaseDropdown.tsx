// components/BaseDropdown.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const BaseDropdown = ({ data, placeholder, styleOverrides = {} }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={[styles.dropdown, styleOverrides.dropdown]}
      placeholderStyle={[styles.placeholderStyle, styleOverrides.placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, styleOverrides.selectedTextStyle]}
      iconStyle={[styles.iconStyle, styleOverrides.iconStyle]}
      itemTextStyle={[styles.itemTextStyle, styleOverrides.itemTextStyle]} 
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
    />
  );
};

export default BaseDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 16,
    borderBottomColor: 'gray',
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#5b0996',
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 12,
  },
});
