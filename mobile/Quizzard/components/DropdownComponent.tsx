// components/DropdownComponent.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Eng -> Tr', value: 'eng-tr' },
  { label: 'Tr -> Eng', value: 'tr-eng' },
  { label: 'Meaning', value: 'meaning' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.itemTextStyle} 
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select type"
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 12,
  },
});
