import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddInterval from './AddInterval';

describe('AddInterval Component', () => {
  const mockOnClose = jest.fn();
  const mockOnAddInterval = jest.fn();
  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    onAddInterval: mockOnAddInterval,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnAddInterval.mockClear();
  });

  test('renders correctly when visible', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddInterval {...defaultProps} />
    );

    expect(getByText('Додати інтервал')).toBeTruthy();
    expect(getByPlaceholderText('Початок інтервалу')).toBeTruthy();
    expect(getByPlaceholderText('Кінець інтервалу')).toBeTruthy();
    expect(getByPlaceholderText('Ціна за годину (опційно)')).toBeTruthy();
    expect(getByText('Затвердити')).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByText } = render(
      <AddInterval {...defaultProps} visible={false} />
    );
    
    expect(queryByText('Додати інтервал')).toBeNull();
  });

  test('handles text input correctly', () => {
    const { getByPlaceholderText } = render(
      <AddInterval {...defaultProps} />
    );

    const startInput = getByPlaceholderText('Початок інтервалу');
    const endInput = getByPlaceholderText('Кінець інтервалу');
    const priceInput = getByPlaceholderText('Ціна за годину (опційно)');

    fireEvent.changeText(startInput, '09:00');
    fireEvent.changeText(endInput, '10:30');
    fireEvent.changeText(priceInput, '500');

    expect(startInput.props.value).toBe('09:00');
    expect(endInput.props.value).toBe('10:30');
    expect(priceInput.props.value).toBe('500');
  });

  test('calls onAddInterval with correct values when confirm button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddInterval {...defaultProps} />
    );

    fireEvent.changeText(getByPlaceholderText('Початок інтервалу'), '09:00');
    fireEvent.changeText(getByPlaceholderText('Кінець інтервалу'), '10:30');
    fireEvent.changeText(getByPlaceholderText('Ціна за годину (опційно)'), '500');

    fireEvent.press(getByText('Затвердити'));

    expect(mockOnAddInterval).toHaveBeenCalledWith({
      start: '09:00',
      end: '10:30',
      price: '500',
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when overlay is pressed', () => {
    const { getByTestId } = render(
      <AddInterval {...defaultProps} />
    );

    const overlay = getByTestId('modal-overlay');
    
    fireEvent.press(overlay);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('initial state is empty strings', () => {
    const { getByPlaceholderText } = render(
      <AddInterval {...defaultProps} />
    );

    expect(getByPlaceholderText('Початок інтервалу').props.value).toBe('');
    expect(getByPlaceholderText('Кінець інтервалу').props.value).toBe('');
    expect(getByPlaceholderText('Ціна за годину (опційно)').props.value).toBe('');
  });

  test('submits form with empty price field', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddInterval {...defaultProps} />
    );

    fireEvent.changeText(getByPlaceholderText('Початок інтервалу'), '09:00');
    fireEvent.changeText(getByPlaceholderText('Кінець інтервалу'), '10:30');

    fireEvent.press(getByText('Затвердити'));

    expect(mockOnAddInterval).toHaveBeenCalledWith({
      start: '09:00',
      end: '10:30',
      price: '',
    });
  });
});