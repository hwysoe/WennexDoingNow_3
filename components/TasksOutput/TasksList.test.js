import React from 'react';
import { render } from '@testing-library/react-native';
import TasksList from './TasksList';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('TasksList', () => {
  it('renders correctly with tasks', () => {
    // Define some sample tasks
    const tasks = [
      {
        id: '1',
        title: 'Task 1',
        startDate: new Date('2023-09-08'),
        endDate: new Date('2023-09-10'),
        priority: 1,
        status: 'In Progress',
      },
      {
        id: '2',
        title: 'Task 2',
        startDate: new Date('2023-09-11'),
        endDate: new Date('2023-09-15'),
        priority: 2,
        status: 'Completed',
      },
    ];

    // Render the TasksList component with the sample tasks
    const { getByText, getAllByText } = render(<TasksList tasks={tasks} />);

    // Check if task titles and dates are rendered correctly
    expect(getByText('Task 1')).toBeTruthy();
    expect(getAllByText('Start Date: 2023-09-08')).toHaveLength(1);
    expect(getByText('Task 2')).toBeTruthy();
    expect(getAllByText('Start Date: 2023-09-11')).toHaveLength(1);

  });

 
});
