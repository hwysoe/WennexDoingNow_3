import { createContext, useReducer } from "react";

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ title, startDate, endDate, priority, status }) => {},
  setTasks: (tasks) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { title, startDate, endDate, priority, status }) => {},
});

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updatableTaskIndex] = updatedItem;
      return updatedTasks;

    case "DELETE":
      return state.filter((task) => task.id != action.payload);

    default:
      return state;
  }
}

function TasksContextprovider({ children }) {
  const [tasksState, dispatch] = useReducer(tasksReducer, []);

  function addTask(taskData) {
    dispatch({ type: "ADD", payload: taskData });
  }

  function setTasks(tasks) {
    dispatch({ type: "SET", payload: tasks });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    setTasks: setTasks,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextprovider;
