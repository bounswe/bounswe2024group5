// Mock warnOnce before any other imports or mocks
jest.mock('react-native/Libraries/Utilities/warnOnce', () => {
  return jest.fn();
});

import 'react-native-gesture-handler/jestSetup';

// Mock the native modules before any imports
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Mock Settings
jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock the entire react-native module
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Mock native modules that might be missing
  RN.NativeModules = {
    ...RN.NativeModules,
    SettingsManager: {
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
    },
  };

  return {
    ...RN,
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      Version: 123,
      select: (obj) => obj.ios,
    },
    Alert: {
      ...RN.Alert,
      alert: jest.fn(),
    },
    // Mock deprecated components to prevent warnings
    ProgressBarAndroid: 'ProgressBarAndroid',
    Clipboard: 'Clipboard',
    PushNotificationIOS: 'PushNotificationIOS',
  };
});

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    assets: [{
      uri: 'test-uri',
      width: 100,
      height: 100,
      type: 'image'
    }]
  }),
  MediaTypeOptions: {
    All: 'All',
    Images: 'Images',
    Videos: 'Videos',
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: '',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock fetch API
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useFocusEffect: jest.fn(),
  };
});