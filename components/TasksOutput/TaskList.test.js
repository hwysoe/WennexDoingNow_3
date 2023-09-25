import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TasksList from "./TasksList";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Define some sample tasks for testing
const tasks = [
  {
    id: "1",
    title: "Test Task",
    startDate: new Date("2023-09-08"),
    endDate: new Date("2023-09-10"),
    priority: 1,
    status: "In Progress",
  },
  {
    id: "2",
    title: "Test Task 2",
    startDate: new Date("2024-09-08"),
    endDate: new Date("2024-09-10"),
    priority: 1,
    status: "In Progress",
  },
];

describe("TasksList", () => {
  it("renders tasks correctly", () => {
    // Render the TasksList component with the sample tasks
    const { getByText } = render(<TasksList tasks={tasks} />);

    // Check if each task title is rendered in the component
    tasks.forEach((task) => {
      const taskTitle = getByText(task.title);
      expect(taskTitle).toBeTruthy();
    });
  });
});
