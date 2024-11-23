// components/QuestionTypeDropdown.tsx

import React from 'react';
import BaseDropdown from './BaseDropdown';

const languageData = [
  { label: 'Eng -> Tr', value: 'english_to_turkish' },
  { label: 'Tr -> Eng', value: 'turkish_to_english' },
  { label: 'Meaning', value: 'english_to_sense' },
];

const LanguageTypeDropdown = ({selectedValue, onValueChange}) => {

  const customStyles = {
    dropdown: {
      borderBottomWidth: 0.5,
    },
  };

  return <BaseDropdown data={languageData} 
  selectedValue={selectedValue}
  onValueChange={onValueChange}
  placeholder="Select type" 
  styleOverrides={customStyles}/>;
};

export default LanguageTypeDropdown;