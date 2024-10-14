// components/QuestionTypeDropdown.tsx

import React from 'react';
import BaseDropdown from './BaseDropdown';

const languageData = [
  { label: 'Eng -> Tr', value: 'eng-tr' },
  { label: 'Tr -> Eng', value: 'tr-eng' },
  { label: 'Meaning', value: 'meaning' },
];

const LanguageTypeDropdown = () => {

  const customStyles = {
    dropdown: {
      borderBottomWidth: 0.5,
    },
  };

  return <BaseDropdown data={languageData} placeholder="Select type" styleOverrides={customStyles}/>;
};

export default LanguageTypeDropdown;
