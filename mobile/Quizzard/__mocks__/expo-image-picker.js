// __mocks__/expo-image-picker.js

export const requestMediaLibraryPermissionsAsync = jest.fn(() =>
    Promise.resolve({ granted: true })
  );
  
  export const launchImageLibraryAsync = jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: 'mock-uri' }],
    })
  );
  