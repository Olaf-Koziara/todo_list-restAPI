import React, { useState } from "react";
import "./TodoItem.css";
import deletIcon from "../../assets/001-delete.png";
import editIcon from "../../assets/002-pen.png";
import applyIcon from "../../assets/001-done.png";
const TodoItem = ({ todo, markComplete, deleteTodo, editTodo }) => {
  const [edit, setEdit] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const { id, title } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const setDate = () => {
    todo.updated_at = new Date().toUTCString();
  };
  return (
    <li className="todoItem" key={id}>
      <button onClick={() => markComplete(id)} className="doneButton">
        <img src={applyIcon} alt="done" />
      </button>

      {edit ? (
        <form
          onSubmit={(e) => {
            editTodo(e, id);
            setEdit(!edit);
            setDate();
          }}
        >
          <input
            value={newTitle}
            onChange={handleChange}
            name="title"
            type="text"
            className="titleInput"
          />
          <button className="applyButton" type="submit">
            <img src={applyIcon} alt="apply" />
          </button>
        </form>
      ) : (
        <>
          <p className="title" onClick={() => setShowPop(!showPop)}>
            {title}
            <span>&#9432;</span>
          </p>
          {showPop ? (
            <div className="card">
              <div className="labelWrapper">
                <div className="labelCreated">Created</div>
                <div className="labelCreated">Due Date</div>
              </div>
              <div className="card-divider">
                {todo.created_at} {todo.due_date}
              </div>

              <div className="card-section">
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <button onClick={() => deleteTodo(id)} className="deleteButton">
        <img src={deletIcon} alt="delete" />
      </button>
      {!edit ? (
        <button className="editButton" onClick={() => setEdit(!edit)}>
          {" "}
          <img src={editIcon} alt="edit" />
        </button>
      ) : (
        ""
      )}
    </li>
  );
};

export default TodoItem;
