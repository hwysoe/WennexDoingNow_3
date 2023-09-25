import React from "react";
import { render, getByText } from "@testing-library/react-native";
import TasksOutput from "./TasksOutput";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("TasksOutput", () => {
  it("renders the fallback text when no tasks are provided", () => {
    const { getByText } = render(
      <TasksOutput tasks={[]} fallbackText="No tasks available" />
    );

    // Check if the fallback text is rendered
    const fallbackTextElement = getByText("No tasks available");
    expect(fallbackTextElement).toBeTruthy();
  });

  it("renders the tasks list when tasks are provided", () => {
    // Define some sample tasks
    const tasks = [
      {
        id: "1",
        title: "Task 1",
        startDate: new Date("2023-09-08"),
        endDate: new Date("2023-09-10"),
        priority: 1,
        status: "In Progress",
      },
      {
        id: "2",
        title: "Task 2",
        startDate: new Date("2023-09-11"),
        endDate: new Date("2023-09-15"),
        priority: 2,
        status: "Completed",
      },
    ];

    const { getByText } = render(
      <TasksOutput tasks={tasks} fallbackText="No tasks available" />
    );
    // Check if task titles and dates are rendered correctly
    expect(getByText("Task 1")).toBeTruthy();
    expect(getByText("Task 2")).toBeTruthy();
    expect(getByText("Start Date: 2023-09-08")).toBeTruthy();
    expect(getByText("Start Date: 2023-09-11")).toBeTruthy();
  });
});
