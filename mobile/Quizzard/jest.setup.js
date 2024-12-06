import 'react-native-gesture-handler/jestSetup';

// Mock the entire react-native module first
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

  return {
    ...RN,
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      Version: 123,
      isTesting: true,
      select: (obj) => obj.ios,
    },
    NativeModules: {
      ...RN.NativeModules,
      SettingsManager: RN.NativeModules.SettingsManager,
    },
    Settings: {
      get: jest.fn(() => ({})),
      set: jest.fn(),
      watchKeys: jest.fn(),
      clearWatch: jest.fn(),
    },
    Animated: {
      Value: jest.fn(() => ({
        interpolate: jest.fn(),
        setValue: jest.fn(),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
    },
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: '',
}));

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

// Updated navigation mock with all required hooks and functions
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    name: 'MockedScreen',
    params: {},
  }),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useIsFocused: () => true,
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');