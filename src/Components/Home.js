import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ProgressBar } from "react-loader-spinner";
import { saveTodo } from "../Apis/todo";

import SingleTodo from "./SingleTodo";

const Home = () => {
  //get user name from local storage
  const names=localStorage.getItem('name')
  const [userName, setUserName]=useState('')

  //use react query
  const {
    isLoading,
    error,
    data: userTodo,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const url = `https://my-todo-server.vercel.app/user-todo?useName=${userName? userName: names}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });


  //to do added handler
  const handleAddTodo = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const todoDetails = {
      userName: userName,
      userEmail: "",
      userId: 0,
      todoText: text,
      createdTime: [
        new Date().getDate(),
        new Date().getMonth(),
        new Date().getFullYear(),
      ],
    };
    saveTodo(todoDetails)
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Todo Added.");
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
    e.target.reset();
  };

  const handleSaveName=(name)=>{
    setUserName(name);
    localStorage.setItem('name', name)
  }


  //if data is loading the loader is return
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      </div>
    );
  }

  //if server have any error than is will show
  if (error)
    return (
      <div className="flex justify-center items-center">
        <p>{"An error has occurred: " + error.message}</p>
      </div>
    );

  return (
    <div className="w-2/5 mx-auto flex items-center justify-center h-screen ">
      <div className="bg-slate-300 rounded-md">
        <form className=" pt-3 pb-3 px-2" onSubmit={handleAddTodo}>
          <label className="block font-medium text-center my-3 text-lg">
            What's your plan for today?
          </label>
          {/* hide and show user name using conditional rendering */}
          {userTodo[0]?.userName ? (
            <span className="font-semibold">Hello,{userTodo[0]?.userName}</span>
          ) : (
            <div className="text-center">
              <label htmlFor="" className="font-semibold">
                Add your name to store your todo list.
              </label>
              <input
                //   save the name of user in the local storage
                onChange={(e) => handleSaveName(e.target.value)}
                type="text"
                name="name"
                id=""
                placeholder="Name"
                className="border border-sky-600 rounded-md px-4 py-2"
                required
              />
            </div>
          )}
          <div className="flex my-5 gap-2 justify-center">
            <input
              type="text"
              name="text"
              placeholder="Add Your Today's Plan"
              className="border border-sky-600 rounded-md px-4 py-3"
            />
            <button
              type="submit"
              className="bg-sky-300 rounded-lg px-3 text-gray-700 font-semibold"
            >
              Add In Todo List
            </button>
          </div>
        </form>
        <div>
          <>
            {/* map user added to do list */}
            {userTodo?.map((todo) => (
              <SingleTodo todo={todo} key={todo._id} refetch={refetch} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default Home;
