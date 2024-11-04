"use client";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/store/features/todoSlice";
const Task = dynamic(() => import("../components/Task"), { ssr: false });

interface TaskType {
  id: string;
  value?: string;
  completed: boolean;
}


export const Home = () => {
  // const [tasksList, setTasksList] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [isError, setIsError] = useState<boolean>(false);
  //   const [error, setError] = useState<Error | null>(null);

  //   const BASE_URL = "https://62ff8d5a9350a1e548e14fde.mockapi.io/tasks";

  const {
    data: tasksList,
    isError,
    isLoading,
    error,
  } = useGetTasksQuery(undefined);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getTasks().then(() => setIsLoading(false));
  // }, []);

  // const getTasks = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}`);
  //     const tasks: TaskType[] = await response.json();
  //     // setTasksList(tasks.reverse());
  //   } catch (err) {
  //     setIsLoading(false);
  //     setIsError(true);
  //     setError(err as Error);
  //   }
  // };
  const [addTask] = useAddTaskMutation();
  // const addTask = async (task: Omit<TaskType, "id">) => {
  //   await fetch(`${BASE_URL}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(task),
  //   });
  //   // getTasks();
  // };
  const [updateTask] = useUpdateTaskMutation();
  // const updateTask = async ({
  //   id,
  //   completed,
  // }: {
  //   id: string;
  //   completed: boolean;
  // }) => {
  //   await fetch(`${BASE_URL}/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ completed }),
  //   });
  //   // getTasks();
  // };
  const [deleteTask] = useDeleteTaskMutation();
  // const deleteTask = async (id: string) => {
  //   await fetch(`${BASE_URL}/${id}`, {
  //     method: "DELETE",
  //   });
  //   // getTasks();
  // };
let errorMessage: string | null = null;

if (isError) {
  if ('status' in error) {
    // This means it's a FetchBaseQueryError
    errorMessage = `Error ${error.status}: ${error.data ? JSON.stringify(error.data) : 'Unknown error'}`;
  } else if ('message' in error) {
    // This means it's a SerializedError
    errorMessage = error.message ?? 'An unknown error occurred.';
  }
}


  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-900 p-4">
        <div className="task-app w-full max-w-md rounded-lg bg-gray-800 px-6 pb-2 pt-6 text-gray-200 shadow-lg">
          <Link href="contact" className="text-white mb-3 block">
            Contact
          </Link>
          <div className="mb-6 flex items-center">
            <svg
              className="h-8 w-8 stroke-current text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h4 className="ml-3 text-lg font-semibold">My Tasks</h4>
          </div>
          <form
           onSubmit={(e) => {
            e.preventDefault();
            const task: Omit<TaskType, "id"> = {
              value: newTask,
              completed: false,
            };
            addTask(task);
            setNewTask("");
          }}
            className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium"
          >
            <svg
              className="h-5 w-5 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              className="ml-4 h-8 w-full flex-grow bg-transparent font-medium focus:outline-none"
              type="text"
              placeholder="Add a new task"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              required
            />
            <button className="text-indigo-400">Add</button>
          </form>
          <div className="tasks-container overflow-auto">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : isError ? (
              <p className="text-center">{errorMessage}</p>
            ) : (
              tasksList?.map(
                (task: TaskType) => (
                  <Task
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
