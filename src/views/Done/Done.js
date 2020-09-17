import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoDoneItem from "../../components/TodoDoneItem/TodoDoneItem";
import { CSSTransition } from "react-transition-group";
import "./Done.css";
const Done = ({ todos, setTodos }) => {
  const deleteTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      });
  };

  return (
    <>
      <h1>Done</h1>
      <ul style={{ listStyle: "none" }}>
        {todos
          .filter((todo) => todo.completed)
          .map((todo, index) => {
            if (todo.completed) {
              return (
                <CSSTransition
                  in={true}
                  appear={true}
                  classNames="done"
                  timeout={index * 100}
                  key={todo.id}
                >
                  <TodoDoneItem
                    deleteTodo={deleteTodo}
                    todo={todo}
                    key={todo.id}
                  />
                </CSSTransition>
              );
            }
          })}
      </ul>
    </>
  );
};

export default Done;
