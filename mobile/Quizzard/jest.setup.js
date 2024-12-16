import { jest } from '@jest/globals';
import '@testing-library/jest-native';
import 'jest-fetch-mock';

// Suppress console warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0].includes('ProgressBarAndroid') ||
    args[0].includes('Clipboard') ||
    args[0].includes('PushNotificationIOS') ||
    args[0].includes('NativeEventEmitter')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

// Mock fetch API
require('jest-fetch-mock').enableMocks();
global.fetch = require('jest-fetch-mock');

// Create all mock implementations first
const mockDropdown = {
  Dropdown: () => null,
  MultiSelect: () => null,
};

const mockImagePicker = {
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({
    canceled: false,
    assets: [{ uri: 'test-image-uri' }]
  })),
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  MediaTypeOptions: {
    Images: 'Images'
  },
};

const mockIcon = () => 'Icon';
mockIcon.getImageSource = jest.fn();
mockIcon.getImageSourceSync = jest.fn();
mockIcon.loadFont = jest.fn();
mockIcon.hasIcon = jest.fn();
mockIcon.getRawGlyphMap = jest.fn();
mockIcon.getFontFamily = jest.fn();

// Then apply all mocks
jest.mock('react-native-element-dropdown', () => mockDropdown);
jest.mock('expo-image-picker', () => mockImagePicker);
jest.mock('@expo/vector-icons', () => ({
  Ionicons: mockIcon,
  createIconSet: () => mockIcon,
}));

// Mock vector icons
jest.mock('react-native-vector-icons/AntDesign', () => mockIcon);
jest.mock('react-native-vector-icons/FontAwesome', () => mockIcon);
jest.mock('react-native-vector-icons/Ionicons', () => mockIcon);

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['en'],
    },
    getConstants: () => ({
      settings: {
        AppleLocale: 'en_US',
        AppleLanguages: ['en'],
      }
    })
  };
  RN.NativeModules.StatusBarManager = {
    getHeight: jest.fn(),
  };
  RN.NativeModules.PlatformConstants = {
    getConstants: () => ({
      forceTouchAvailable: false,
      isTesting: true,
      reactNativeVersion: {
        major: 0,
        minor: 68,
        patch: 2,
      },
      Version: 123,
    }),
  };
  return {
    ...RN,
    NativeModules: {
      ...RN.NativeModules,
      SettingsManager: RN.NativeModules.SettingsManager,
      StatusBarManager: RN.NativeModules.StatusBarManager,
      PlatformConstants: RN.NativeModules.PlatformConstants,
    },
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      Version: 123,
      isTesting: true,
      select: (obj) => obj.ios,
    },
    InteractionManager: {
      runAfterInteractions: jest.fn((callback) => callback()),
    },
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock other Expo modules
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(() => Promise.resolve('base64-string')),
}));