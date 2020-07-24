import React from "react";
import deleteIcon from "../../assets/001-delete.png";
import "./TodoDoneItem.css";
const TodoDoneItem = ({ todo, deleteTodo }) => {
  const doneDate = todo.date ? todo.date : "00-00-0000 00:00";

  return (
    <li className="itemDone">
      <p className="title">{todo.title}</p>
      <p>{doneDate}</p>
      <div onClick={() => deleteTodo(todo.id)} className="iconWrapper">
        <img src={deleteIcon} alt="delete" />
      </div>
    </li>
  );
};

export default TodoDoneItem;
