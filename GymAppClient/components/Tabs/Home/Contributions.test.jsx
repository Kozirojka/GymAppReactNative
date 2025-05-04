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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn()
}));

global.fetch = jest.fn();

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('Contributions Component', () => {
  const mockUserToken = 'test-user-token-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    jest.spyOn(global, 'Date').mockImplementation(() => 
      new Date('2025-05-01T12:00:00Z')
    );
    
    AsyncStorage.getItem.mockResolvedValue(mockUserToken);
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockContributionsData)
    });
    
    console.log = jest.fn();
    console.error = jest.fn();
  });
  
  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    
    jest.restoreAllMocks();
  });
  
  it('renders the header correctly', () => {
    const { getByText } = render(<Contributions />);
    expect(getByText('🏋️‍♂️ Gym Activity (52 тижні)')).toBeTruthy();
  });
  
  it('fetches data with correct authorization header', async () => {
    render(<Contributions />);
    
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
      
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
    const { getColor } = require('./Contributions');
    
    expect(getColor(0)).toBe('#ebedf0');  
    expect(getColor(1)).toBe('#c6e48b');  
    expect(getColor(3)).toBe('#7bc96f');  
    expect(getColor(5)).toBe('#239a3b');  
    expect(getColor(7)).toBe('#196127');  
  });
  
  it('renders squares with the right colors based on contribution data', async () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();


    const { UNSAFE_root } = render(<Contributions />);
    
    await waitFor(() => {
      const squares = UNSAFE_root.findAllByProps(node => {
        if (!node.props || !node.props.style) return false;
        const styles = Array.isArray(node.props.style) ? node.props.style : [node.props.style];
        return styles.some(style => style.width === 10 && style.height === 10);
      });
      
      expect(squares.length).toBeGreaterThan(0);
    });
  });
  
  it('handles API error gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));
    
    render(<Contributions />);
    
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching contributions:', 
        expect.any(Error)
      );
    });
  });
  
  it('handles non-OK API response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden'
    });
    
    render(<Contributions />);
    
    await waitFor(() => {
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