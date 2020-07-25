import React, { useState } from "react";
import "./TodoItem.css";
import deletIcon from "../../assets/001-delete.png";
import editIcon from "../../assets/002-pen.png";
import applyIcon from "../../assets/001-done.png";
import { CSSTransition } from "react-transition-group";
const TodoItem = ({
  todo,
  markComplete,
  deleteTodo,
  editTodo,
  click,
  clicked,
}) => {
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
    <li className="todoItem " key={id}>
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
          <p
            className="itemTitle"
            onClick={() => {
              if (!clicked || showPop) {
                setShowPop(!showPop);

                click();
              }
            }}
          >
            {title}
          </p>

          {showPop ? (
            <CSSTransition
              in={showPop}
              appear={true}
              timeout={0}
              classNames="pop"
            >
              <div className="card">
                <div className="card-divider">
                  <div className="labelCreated">Created</div>
                  <div className="mx-auto">{todo.created_at}</div>
                  <div className="labelCreated">Planned due date</div>

                  <div className="mx-auto">{todo.due_date}</div>
                </div>
                <div className="card-section">
                  <h4>{todo.title}</h4>
                  <p>{todo.description}</p>
                </div>
              </div>
            </CSSTransition>
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
      <div className="accordion-content" data-tab-content>
        {todo.description}
      </div>
    </li>
  );
};

export default TodoItem;
