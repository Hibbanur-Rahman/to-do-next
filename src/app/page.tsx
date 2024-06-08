"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import DOMAIN from "../../environmentsVariables";
import httpStatusCode from "@/constants/httpStatusCode";
import loadingGif from "@/assets/images/loading-gif.gif";
import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter();
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [completeCount, setCompleteCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        `${DOMAIN}/todo/add-todo`,
        { task: taskInput },
        {
          headers: {
            Authorization: localStorage.getItem("to-do-token"),
          },
        }
      );

      if (response.status === httpStatusCode.CREATED) {
        toast.success("Task added successfully");
        setTaskInput("");
        handleViewListTask();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    }
  };

  const handleViewListTask = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/todo/view-todo`, {
        headers: {
          Authorization: localStorage.getItem("to-do-token"),
        },
      });

      if (response.status === httpStatusCode.OK) {
        setTaskList(response.data.data.pendingTask);
        setCompletedTaskList(response.data.data.completedTask);
        setCompleteCount(response.data.data.completedTask.length);
        setPendingCount(response.data.data.pendingTask.length);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error in the viewing task list:", error);
      toast.error("Failed to view list");
    }
  };

  const handleCompleteTodo = async (taskItemId: any) => {
    try {
      const response = await axios.post(
        `${DOMAIN}/todo/complete-todo`,
        { taskItemId },
        {
          headers: {
            Authorization: localStorage.getItem("to-do-token"),
          },
        }
      );

      if (response.status === httpStatusCode.OK) {
        toast.success("Task completed successfully");
        handleViewListTask();
      }
    } catch (error) {
      console.log("Error in the completing task:", error);
      toast.error("Failed to complete task");
    }
  };

  const handleDeleteTodo = async (taskItemId: any) => {
    try {
      const response = await axios.post(
        `${DOMAIN}/todo/delete-todo`,
        { taskItemId },
        {
          headers: {
            Authorization: localStorage.getItem("to-do-token"),
          },
        }
      );
      if (response.status === httpStatusCode.OK) {
        toast.success("Task deleted successfully");
        handleViewListTask();
      }
    } catch (error) {
      console.log("Error in delete the todo:", error);
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("to-do-token");
    if (!token) {
      toast.error("login first");
      router.push("/login");
    } else {
      handleViewListTask();
    }

    return () => {
      // Any necessary cleanup
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar />

      <div className="mt-8 container md:w-5/12 lg:w-5/12 w-full rounded-2xl p-6 shadow-2xl">
        <div className="w-full flex flex-wrap justify-between">
          <input
            type="text"
            placeholder="Add a new task"
            className=" text-white rounded-lg w-10/12 bg-transparent border-2 p-2"
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
            value={taskInput}
          />

          <button
            className="add-btn text-white w-1/12 rounded-lg "
            onClick={handleAddTask}
          >
            <i className="bi bi-plus-lg text-white text-3xl"></i>
          </button>
        </div>

        {isLoading ? (
          <div className="flex w-full flex-wrap items-center justify-center mt-28 mb-20">
            <Image src={loadingGif} alt="" style={{ height: '100px', width: '100px' }} />
          </div>
        ) : (
          <>
            {/** to-do-task section */}
            <div className="flex flex-wrap w-full mt-6">
              <p className="text-white mb-4 mt-4">
                Tasks to do - {pendingCount}
              </p>
              <div className="flex flex-wrap w-full">
                {Array.isArray(taskList) &&
                  taskList.map((task: any, key) => (
                    <div
                      className="item-to-do flex flex-wrap items-center rounded-lg py-4 px-3 w-full shadow-xl mt-2 mb-2"
                      key={key}
                      id={task._id}
                    >
                      <p className="w-10/12">{task.title}</p>
                      <i
                        className="m-0 p-0 bi bi-check-lg w-1/12 text-3xl cursor-pointer hover:text-green-600"
                        onClick={() => {
                          handleCompleteTodo(task._id);
                        }}
                      ></i>
                      <i
                        className="m-0 p-0 bi bi-trash w-1/12 text-2xl cursor-pointer hover:text-red-700"
                        onClick={() => {
                          handleDeleteTodo(task._id);
                        }}
                      ></i>
                    </div>
                  ))}
              </div>
            </div>

            {/**done-task section */}
            <div className="flex flex-wrap w-full mt-6">
              <p className="text-white mb-4 mt-4">Done - {completeCount}</p>
              <div className="flex flex-wrap w-full">
                {Array.isArray(completedTaskList) &&
                  completedTaskList.map((task: any, key) => (
                    <div
                      className="item-to-do flex flex-wrap items-center justify-between rounded-lg py-4 px-3 w-full shadow-xl mt-2 mb-2"
                      key={key}
                      id={task._id}
                    >
                      <p className=" text-green-500 line-through w-11/12">
                        {task.title}
                      </p>
                      <i
                        className="m-0 p-0 bi bi-trash w-1/12 text-2xl cursor-pointer hover:text-red-700"
                        onClick={() => {
                          handleDeleteTodo(task._id);
                        }}
                      ></i>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
