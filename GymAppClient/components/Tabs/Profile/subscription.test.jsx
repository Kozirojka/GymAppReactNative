import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Subscription from './Subscription'; 

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Dimensions: {
      get: jest.fn(() => ({ width: 400, height: 800 })),
    },
  };
});

jest.mock('../../../assets/rooster1.jpg', () => 'rooster1');
jest.mock('../../../assets/rooster2.jpg', () => 'rooster2');
jest.mock('../../../assets/rooster3.jpg', () => 'rooster3');

describe('Subscription компонент', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigation.goBack.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('відображає індикатор завантаження, коли loading=true', () => {
    const { getByTestId } = render(<Subscription navigation={mockNavigation} />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('відображає список підписок після завантаження', async () => {
    const { getByText, queryByTestId } = render(<Subscription navigation={mockNavigation} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });
    
    expect(getByText('Choose your Subscription')).toBeTruthy();
    
    expect(getByText('Morning Access')).toBeTruthy();
    expect(getByText('Premium subscription')).toBeTruthy();
    expect(getByText('Basic Access')).toBeTruthy();
  });

  test('відображає правильні дані для початкової підписки (Premium)', async () => {
    const { getByText } = render(<Subscription navigation={mockNavigation} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(getByText('Premium subscription')).toBeTruthy();
      expect(getByText('Unlimited enter to the gym')).toBeTruthy();
      expect(getByText('Own coach any time of day')).toBeTruthy();
      expect(getByText('from 10 - 19')).toBeTruthy();
      expect(getByText('$30')).toBeTruthy();
      
      expect(getByText('Subscribe to Premium subscription')).toBeTruthy();
    });
  });

  test('кнопка "Go back" викликає navigation.goBack()', async () => {
    const { getByText } = render(<Subscription navigation={mockNavigation} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      const goBackButton = getByText('⬅️ Go back');
      fireEvent.press(goBackButton);
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });

  test('натискання на кнопку "Subscribe" показує попередження', async () => {
    global.alert = jest.fn();
    
    const { getByText } = render(<Subscription navigation={mockNavigation} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe to Premium subscription');
      fireEvent.press(subscribeButton);
      expect(global.alert).toHaveBeenCalledWith('Subscribed to Premium subscription');
    });
  });

  test('симуляція скролу для зміни активної підписки', async () => {
    const { getByTestId } = render(<Subscription navigation={mockNavigation} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      const flatList = getByTestId('subscription-flatlist');
      
      fireEvent.scroll(flatList, {
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
          contentSize: { width: 1200, height: 350 },
          layoutMeasurement: { width: 400, height: 800 },
        },
      });
      
      expect(getByTestId('pagination-dot-active')).toHaveAttribute('data-index', '0');
    });
  });
});