// components/DifficultyLevelDropdown.tsx
import React from 'react';
import BaseDropdown from './BaseDropdown';

const difficultyData = [
  { label: 'A1', value: 'a1' },
  { label: 'A2', value: 'a2' },
  { label: 'B1', value: 'b1' },
  { label: 'B2', value: 'b2' },
  { label: 'C1', value: 'c1' },
  { label: 'C2', value: 'c2' },
];

const DifficultyLevelDropdown = () => {
  const customStyles = {
    dropdown: {
    height: 8,
    width: 100,
    margin: 8,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  };

  return <BaseDropdown data={difficultyData} placeholder="Select level" styleOverrides={customStyles} />;
};

export default DifficultyLevelDropdown;
