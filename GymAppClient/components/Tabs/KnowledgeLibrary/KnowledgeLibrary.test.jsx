import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import KnowledgeLibrary from './KnowledgeLibrary';

describe('KnowledgeLibrary', () => {
  const mockNavigate = jest.fn();
  const mockNavigation = { navigate: mockNavigate };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the search bar and exercises', () => {
    const { getByPlaceholderText, getByText } = render(<KnowledgeLibrary navigation={mockNavigation} />);

    expect(getByPlaceholderText('Find the set: "Chest set"')).toBeTruthy();
    expect(getByText('Straight Sets')).toBeTruthy();
    expect(getByText('Progressive Overload')).toBeTruthy();
  });

  it('filters exercises based on search query', () => {
    const { getByPlaceholderText, queryByText } = render(<KnowledgeLibrary navigation={mockNavigation} />);

    const searchInput = getByPlaceholderText('Find the set: "Chest set"');
    fireEvent.changeText(searchInput, 'drop');

    expect(queryByText('Drop Sets')).toBeTruthy();
    expect(queryByText('Straight Sets')).toBeNull();
  });

  it('toggles tag and updates filtered list', () => {
    const { getByText, queryByText } = render(<KnowledgeLibrary navigation={mockNavigation} />);

    const newTagButton = getByText('+ new');
    fireEvent.press(newTagButton);

    expect(queryByText('Straight Sets')).toBeNull();
    expect(queryByText('Drop Sets')).toBeNull();
  });

  it('navigates to ExerciseDetails on card press', () => {
    const { getByText } = render(<KnowledgeLibrary navigation={mockNavigation} />);
    
    const card = getByText('Straight Sets');
    fireEvent.press(card);

    expect(mockNavigate).toHaveBeenCalledWith('ExerciseDetails', { exercise: expect.objectContaining({ title: 'Straight Sets' }) });
  });
});
