import 'react-native-gesture-handler/jestSetup';

// Mock the native modules before any imports
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

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
  RN.NativeModules.NativeAnimatedModule = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    getValue: jest.fn(),
    setValue: jest.fn(),
    setOffset: jest.fn(),
    flattenOffset: jest.fn(),
    extractOffset: jest.fn(),
    addListener: jest.fn(),
  };
  RN.Animated.timing = () => ({
    start: jest.fn(),
  });
  return RN;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {});

// Mock Icons
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesignIcon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesomeIcon');
jest.mock('@expo/vector-icons', () => ({
  Ionicons: '',
}));

// Use the official async storage mock
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

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
