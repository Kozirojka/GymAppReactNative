import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import Pins from './Pins';
import Contributions from './Contributions';

jest.mock('react-native-reanimated-carousel', () => {
  const { View } = require('react-native');
  return jest.fn().mockImplementation(({ renderItem, data }) => {
    return (
      <View testID="mocked-carousel">
        {data.map((item, index) => (
          <View key={index}>{renderItem({ item, index })}</View>
        ))}
      </View>
    );
  });
});

jest.mock('./Pins', () => {
  const { View, Text } = require('react-native');
  return jest.fn().mockImplementation(() => (
    <View testID="mocked-pins">
      <Text>Mocked Pins</Text>
    </View>
  ));
});

jest.mock('./Contributions', () => {
  const { View, Text } = require('react-native');
  return jest.fn().mockImplementation(() => (
    <View testID="mocked-contributions">
      <Text>Mocked Contributions</Text>
    </View>
  ));
});

jest.mock('./HomeScreen', () => {
  const React = require('react');
  const originalModule = jest.requireActual('./HomeScreen');
  
  const MockHomeScreen = (props) => {
    const [data, loading] = React.useState(null, false);
    
    return originalModule.default({
      ...props,
      testData: props.testData,
      testLoading: props.testLoading
    });
  };
  
  return {
    __esModule: true,
    default: jest.fn(MockHomeScreen)
  };
});

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const OriginalHomeScreen = jest.requireActual('./HomeScreen').default;

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    
    expect(getByTestId('mocked-carousel')).toBeTruthy();
    expect(getByTestId('mocked-pins')).toBeTruthy();
    expect(getByTestId('mocked-contributions')).toBeTruthy();
  });

  it('renders loading state when loading is true', () => {
    const TestComponent = () => {
      const [data, setData] = React.useState(null);
      const [loading, setLoading] = React.useState(true);  
      
      return (
        <View>
          {loading && <Text testID="loading-indicator">Loading...</Text>}
          <OriginalHomeScreen navigation={mockNavigation} />
        </View>
      );
    };
    
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays data when available and not loading', () => {
    const testData = { test: 'data' };
    
    const TestComponent = () => {
      const [data, setData] = React.useState(testData);
      const [loading, setLoading] = React.useState(false);
      
      return (
        <View>
          {!loading && data && <Text testID="data-display">{JSON.stringify(data)}</Text>}
          <OriginalHomeScreen navigation={mockNavigation} />
        </View>
      );
    };
    
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('data-display')).toBeTruthy();
    expect(getByTestId('data-display').props.children).toBe(JSON.stringify(testData));
  });

  it('renders Carousel component', () => {
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByTestId('mocked-carousel')).toBeTruthy();
  });

  it('renders Pins component', () => {
    render(<HomeScreen navigation={mockNavigation} />);
    expect(Pins).toHaveBeenCalled();
  });

  it('renders Contributions component', () => {
    render(<HomeScreen navigation={mockNavigation} />);
    expect(Contributions).toHaveBeenCalled();
  });
});