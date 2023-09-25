import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskItem from './TaskItem';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('TaskItem', () => {
  const task = {
    id: '1',
    title: 'Test Task',
    startDate: new Date('2023-09-08'),
    endDate: new Date('2023-09-10'),
    priority: 1,
    status: 'In Progress',
  };

  it('renders the task item correctly', () => {
    const { getByText } = render(<TaskItem {...task} />);
    
    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Start Date: 2023-09-08')).toBeTruthy();
    expect(getByText('End Date: 2023-09-10')).toBeTruthy();
    expect(getByText('Status: In Progress')).toBeTruthy();
    expect(getByText('1')).toBeTruthy(); // Priority
  });

});
