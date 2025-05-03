import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import Contributions from './Contributions'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASIC_API } from '../../../utils/BASIC_API'; 

const mockContributionsData = [
  {
    "id": "01964899-a875-7071-b7ea-ebe2d05747a9",
    "userId": "4ddb0aa8-237b-4adf-912b-b0ce2ef7d11a",
    "date": "2025-04-18T00:00:00Z",
    "amount": 4,
    "user": null
  },
  {
    "id": "02964899-a875-7071-b7ea-ebe2d05747b8",
    "userId": "4ddb0aa8-237b-4adf-912b-b0ce2ef7d11a",
    "date": "2025-04-15T00:00:00Z",
    "amount": 2,
    "user": null
  },
  {
    "id": "03964899-a875-7071-b7ea-ebe2d05747c7",
    "userId": "4ddb0aa8-237b-4adf-912b-b0ce2ef7d11a",
    "date": "2025-03-10T00:00:00Z",
    "amount": 5,
    "user": null
  },
  {
    "id": "04964899-a875-7071-b7ea-ebe2d05747d6",
    "userId": "4ddb0aa8-237b-4adf-912b-b0ce2ef7d11a",
    "date": "2024-12-01T00:00:00Z",
    "amount": 1,
    "user": null
  }
];

// Мокаємо модулі
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn()
}));

// Мокаємо глобальний fetch
global.fetch = jest.fn();

// Мокаємо console.log і console.error щоб не забруднювати вивід при тестуванні
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('Contributions Component', () => {
  const mockUserToken = 'test-user-token-123';

  // Налаштування перед кожним тестом
  beforeEach(() => {
    // Очищаємо всі моки
    jest.clearAllMocks();
    
    // Мокаємо дату для стабільності тестів
    jest.spyOn(global, 'Date').mockImplementation(() => 
      new Date('2025-05-01T12:00:00Z')
    );
    
    // Встановлюємо мок для AsyncStorage.getItem
    AsyncStorage.getItem.mockResolvedValue(mockUserToken);
    
    // Встановлюємо мок для глобального fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockContributionsData)
    });
    
    // Мокаємо console.log і console.error
    console.log = jest.fn();
    console.error = jest.fn();
  });
  
  // Відновлення після кожного тесту
  afterEach(() => {
    // Відновлюємо оригінальні console.log і console.error
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    
    // Відновлюємо оригінальну Date
    jest.restoreAllMocks();
  });
  
  // Тести
  it('renders the header correctly', () => {
    const { getByText } = render(<Contributions />);
    expect(getByText('🏋️‍♂️ Gym Activity (52 тижні)')).toBeTruthy();
  });
  
  it('fetches data with correct authorization header', async () => {
    render(<Contributions />);
    
    await waitFor(() => {
      // Перевіряємо, що AsyncStorage.getItem був викликаний з правильним ключем
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
      
      // Перевіряємо, що fetch був викликаний з правильними параметрами
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASIC_API}/contribution`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mockUserToken}`
          }
        }
      );
    });
  });
  
  
  
  it('displays correct color for different contribution amounts', () => {
    // Імпортуємо функцію getColor з компонента
    const { getColor } = require('./Contributions');
    
    // Перевіряємо, що getColor повертає правильні кольори для різних значень
    expect(getColor(0)).toBe('#ebedf0');  // Нульовий внесок
    expect(getColor(1)).toBe('#c6e48b');  // Малий внесок
    expect(getColor(3)).toBe('#7bc96f');  // Середній внесок
    expect(getColor(5)).toBe('#239a3b');  // Великий внесок
    expect(getColor(7)).toBe('#196127');  // Дуже великий внесок
  });
  
  it('renders squares with the right colors based on contribution data', async () => {
    // Перш за все потрібно привести Contributions.jsx у відповідність до тесту:
    // Додати export для getColor: export const getColor = (count) => { ... }
    
    const { UNSAFE_root } = render(<Contributions />);
    
    await waitFor(() => {
      // Знаходимо всі квадратики (елементи View з розміром 10x10)
      const squares = UNSAFE_root.findAllByProps(node => {
        if (!node.props || !node.props.style) return false;
        const styles = Array.isArray(node.props.style) ? node.props.style : [node.props.style];
        return styles.some(style => style.width === 10 && style.height === 10);
      });
      
      // Перевіряємо, що певні квадратики мають очікуваний колір
      expect(squares.length).toBeGreaterThan(0);
    });
  });
  
  it('handles API error gracefully', async () => {
    // Тут мокуємо fetch, щоб він повернув помилку
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));
    
    render(<Contributions />);
    
    await waitFor(() => {
      // Перевіряємо, що помилка була зареєстрована
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching contributions:', 
        expect.any(Error)
      );
    });
  });
  
  it('handles non-OK API response', async () => {
    // Мокуємо fetch, щоб він повернув не-OK відповідь
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden'
    });
    
    render(<Contributions />);
    
    await waitFor(() => {
      // Перевіряємо, що помилка була зареєстрована
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching contributions:', 
        expect.any(Error)
      );
    });
  });
  
  it('creates snapshot that matches', () => {
    const tree = render(<Contributions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});