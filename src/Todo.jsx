import React, { useReducer } from "react";
import { useState } from "react";

const initialState = [];

const reducer = (state, action) => {
  if (action.type === "submit") {
    return [...state, action.payload];
  } else if (action.type === "deleteTask") {
    return state.filter((t) => t !== action.payload);
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todo, setTodo] = useState("");
  //state is an empty array now: state: []

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      alert("Please enter a task before submit.");
    } else {
      dispatch({ type: "submit", payload: todo });
    }
    setTodo("");
  };
  const deleteTodo = (toDelete) => {
    dispatch({ type: "deleteTask", payload: toDelete });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new task..."
          />
          <button type="submit">submit</button>
        </form>

        <div>
          <ul className="todos-list">
            {state.map((t) => (
              <>
                <li className="todo">
                  {t}
                  <button onClick={() => deleteTodo(t)} className="close">
                    X
                  </button>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
