import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import { CSSTransition } from "react-transition-group";
const TodoList = ({ todos, markComplete, deleteTodo, editTodo }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <ul className="TodoList">
      {todos
        .filter((todo) => !todo.completed)
        .map((todo, index) => {
          return (
            <CSSTransition
              key={todo.id}
              timeout={index * 80}
              in={true}
              mountOnEnter={true}
              unmountOnExit={true}
              classNames="item"
              appear={true}
            >
              <TodoItem
                key={todo.id}
                todo={todo}
                markComplete={markComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                click={() => setClicked(!clicked)}
                clicked={clicked}
              />
            </CSSTransition>
          );
        })}
    </ul>
  );
};

export default TodoList;
