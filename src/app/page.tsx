"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react-lite";
import TodoStore from "./TodoStore";

const IndexPage = observer(() => {
  const [todo, setTodo] = useState("");
  const store = useLocalObservable(() => TodoStore.create({ todos: [] }));

  const handleAddTodo = () => {
    if (todo === "") {
      alert("input something !");
    } else {
      const newTodo = { id: Date.now().toString(), text: todo };
      store.addTodo(newTodo);
      setTodo("");
    }
  };

  const handleRemoveTodo = (todoId) => {
    store.removeTodo(todoId);
  };

  return (
    <>
      <div className="bg-[#F7E286] p-3 border-b-4 border-[#EBB726]">
        <div className="text-slate-950 text-3xl font-['SF Pro'] font-semibold ">
          Snowchild
        </div>
        <div className="text-xs text-black">©Manan Tandon</div>
      </div>
      {/*TODO*/}
      <div className="m-5 font-normal bg-white p-3 w-auto rounded-xl flex flex-col">
        <div className="text-2xl">Todo: </div>
        <div className="flex flex-row">
          <input
            type="text"
            value={todo}
            className="border-2 border-black outline-none p-2 w-6/12 m-2 text-xl rounded"
            onChange={(event) => setTodo(event.target.value)}
          />
          <button
            className="border-2 border-black p-4 w-fit h-fit m-2 rounded hover:bg-[#F7E286] hover:border-[#EBB726]"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>

        {store.todos.map((todo, key) => (
          <div className="flex flex-col m-2 p-2 bg-[#FFFDE7]" key={key}>
            <div className="flex flex-row gap-x-5">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todo.toggle()}
              />
              <div
                className={`w-full p-2 text-normal ${
                  todo.completed ? "line-through" : "no-underline"
                }`}
              >
                {todo.text}
              </div>
              <button
                className="text-slate-500 border-2 border-slate-300 p-2 rounded hover:bg-slate-300 hover:text-white "
                onClick={() => handleRemoveTodo(todo.id)}
              >
                remove
              </button>
            </div>
            <div>
              {todo.completed ? "Completed  " : "in progress  "}
              <span
                className={`${
                  todo.completed
                    ? "bg-green-600 text-green-600"
                    : "bg-red-600 text-red-600"
                }  rounded-full w-5 h-5`}
              >
                ....
              </span>
            </div>
          </div>
        ))}
        <p>Completed: {store.completedTodosCount}</p>
      </div>
    </>
  );
});

export default IndexPage;
