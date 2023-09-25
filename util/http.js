import axios from "axios";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

const BACKEND_URL =
  "https://wennex-af468-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeTask(taskData) {
  const response = await axios.post(BACKEND_URL + "/task.json", taskData);
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  const response = await axios.get(BACKEND_URL + "/task.json");

  const tasks = [];
  // const authCtx = useContext(AuthContext);
  // const userID = authCtx.getToken();

  for (const key in response.data) {
    const taskObj = {
      id: key,
      title: response.data[key].title,
      startDate: new Date(response.data[key].startDate),
      endDate: new Date(response.data[key].endDate),
      priority: response.data[key].priority,
      status: response.data[key].status,
      email: response.data[key].email,
      // userID:
      // userID: authCtx.getToken(),
    };
    tasks.push(taskObj);
    // console.log(taskObj.userID);
  }

  return tasks;
}

export function updateTask(id, taskData) {
  return axios.put(BACKEND_URL + `/task/${id}.json`, taskData);
}

export function deleteTask(id) {
  return axios.delete(BACKEND_URL + `/task/${id}.json`);
}
