import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import CoatchSheduleOwn from './CoachSheduleOwn';

jest.mock('./AddInterval', () => {
  const React = require('react');
  return jest.fn(({ visible, onClose, onAddInterval }) => {
    if (!visible) return null;
    
    return (
      <div data-testid="mock-add-interval">
        <button 
          data-testid="mock-add-button" 
          onClick={() => onAddInterval({ start: '11:00', end: '12:00' })}
        >
          Add Interval
        </button>
        <button 
          data-testid="mock-close-button" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  });
});

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 400, height: 800 }),
}));

describe('CoatchSheduleOwn Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigation.navigate.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders loading state initially', () => {
    const { getByText, queryByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    expect(getByText('📅 Розклад тренера')).toBeTruthy();
    expect(queryByText('2025-04-08')).toBeNull(); 
  });

  test('renders schedule data after loading', async () => {
    const { getByText, queryByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(getByText('2025-04-08')).toBeTruthy();
      expect(getByText('🕒 09:00 - 10:00')).toBeTruthy();
    });
  });

  test('shows "Немає інтервалів" when no intervals exist for a day', async () => {
    const { getByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(getByText('2025-04-10')).toBeTruthy();
      expect(getByText('Немає інтервалів')).toBeTruthy();
    });
  });

  test('shows assigned users for intervals', async () => {
    const { getByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(getByText('👥 Прикріплено: 1, 2')).toBeTruthy();
    });
  });

  test('opens AddInterval modal when add button is pressed', async () => {
    const { getByText, getByTestId } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    fireEvent.press(getByText('➕ Додати інтервал'));
    
    await waitFor(() => {
      expect(getByTestId('mock-add-interval')).toBeTruthy();
    });
  });

  test('adds a new interval when AddInterval form is submitted', async () => {
    const { getByText, getByTestId, getAllByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const initialIntervals = getAllByText(/🕒/).length;
    
    fireEvent.press(getByText('➕ Додати інтервал'));
    
    fireEvent.press(getByTestId('mock-add-button'));
    
    await waitFor(() => {
      const newIntervals = getAllByText(/🕒/).length;
      expect(newIntervals).toBe(initialIntervals + 1);
      expect(getByText('🕒 11:00 - 12:00')).toBeTruthy();
    });
  });

  test('navigates to interval details when an interval is pressed', async () => {
    const { getByText } = render(
      <CoatchSheduleOwn navigation={mockNavigation} />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    fireEvent.press(getByText('🕒 09:00 - 10:00'));
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('IntervalsDetails', {
      interval: { start: '09:00', end: '10:00', users: [] },
      date: '2025-04-08',
    });
  });
});