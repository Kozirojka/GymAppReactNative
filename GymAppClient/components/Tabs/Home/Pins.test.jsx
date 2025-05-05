import React from 'react';
import { render } from '@testing-library/react-native';
import Pins from './Pins'; 

describe('Pins Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Pins />);
    
    const titleElement = getByText('Pins');
    expect(titleElement).toBeTruthy();
    
    const descriptionElement = getByText('This is the Pins component.');
    expect(descriptionElement).toBeTruthy();
  });
  
  it('has the correct styles', () => {
    const { getByText } = render(<Pins />);
    
    const titleElement = getByText('Pins');
    const descriptionElement = getByText('This is the Pins component.');
    
    expect(titleElement.props.style).toEqual(
      expect.objectContaining({
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      })
    );
    
    expect(descriptionElement.props.style).toEqual(
      expect.objectContaining({
        fontSize: 16,
        color: '#666',
      })
    );
  });
  
  it('snapshot matches', () => {
    const tree = render(<Pins />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});