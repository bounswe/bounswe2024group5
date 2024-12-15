export default {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  };
  
  export const mockNavigate = jest.fn();
  export const mockGoBack = jest.fn();
  export const mockSetOptions = jest.fn();
  
  export const NavigationMock = {
    navigate: mockNavigate,
    goBack: mockGoBack,
    setOptions: mockSetOptions
  };
  
  export const createStackNavigator = () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  });
  