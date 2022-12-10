import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteTodo, editTodo } from "../Apis/todo";
const SingleTodo = ({ todo, refetch }) => {
  const [edit, setEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  console.log(todo);

  //delete added todo
  const handleDeleteTodo = (id) => {
    deleteTodo(id)
      .then((data) => {
        refetch();
        toast.success("Your Todo is deleted.");
      })
      .catch((err) => toast.error(err.message));
  };

  //edit already added todo text

  const handleEdit = (id) => {
    editTodo(id, updatedText)
      .then((data) => {
        toast.success("Your todo updated.");
        setEdit(false);
        refetch();
      })
      .catch((error) => {
        setEdit(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="bg-blue-500 mx-3 rounded-sm my-3 text-white">
        <div className="flex items-center gap-5 justify-between px-5 py-2">
          <div>
            <h3>{todo?.todoText}</h3>
            <small className="text-gray-700">
              {todo?.createdTime[0]}:{todo?.createdTime[1]}:
              {todo?.createdTime[2]}
            </small>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEdit(!edit)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteTodo(todo?._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      {edit ? (
        <div className="flex my-1 gap-2 justify-center">
          <input
            onChange={(e) => setUpdatedText(e.target.value)}
            type="text"
            name="text"
            placeholder="Add Your Today's Plan"
            className="border border-sky-600 rounded-md px-4"
          />
          <button
            onClick={() => handleEdit(todo?._id)}
            type="submit"
            className="bg-sky-300 rounded-lg px-3 text-gray-700 font-semibold"
          >
            Add In Todo List
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleTodo;
