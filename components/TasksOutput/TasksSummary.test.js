import React from 'react';
import { render, getByText } from '@testing-library/react-native';
import TasksSummary from './TasksSummary';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('TasksSummary', () => {
  it('renders the total number of tasks correctly', () => {
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

    // Calculate the expected total number of tasks
    const expectedTotal = tasks.length;

    // Render the TasksSummary component with the sample tasks
    const { getByText } = render(<TasksSummary tasks={tasks} />);

    // Check if the total number of tasks is rendered correctly
    const totalTasksElement = getByText(`Total Number Of Tasks`);
    const totalValueElement = getByText(`${expectedTotal}`);
    expect(totalTasksElement).toBeTruthy();
    expect(totalValueElement).toBeTruthy();
  });

  it('renders correctly with no tasks', () => {
    // Render the TasksSummary component with an empty tasks array
    const { getByText } = render(<TasksSummary tasks={[]} />);

    // Check if a message indicating no tasks is rendered
    expect(getByText('Total Number Of Tasks')).toBeTruthy();
    expect(getByText('0')).toBeTruthy(); // Total is 0
  });
});
