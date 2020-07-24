import React, { useState } from "react";
import "./TodoForm.css";
import { CSSTransition } from "react-transition-group";
const TodoForm = ({ addTodo }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const add = (e) => {
    addTodo(e);
    setIsAdding(false);
  };
  return isAdding ? (
    <CSSTransition
      key="1"
      mountOnEnter={true}
      unmountOnExit={true}
      classNames="form"
      appear={true}
      in={true}
      timeout={0}
    >
      <div className="text-center formWrapper">
        <form className="TodoForm" onSubmit={(e) => add(e)}>
          <input
            className="inputTitle"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="description"
            name="description"
            placeholder="description"
          />
          <label htmlFor="dueDate"> Due date: </label>

          <input className="dueDate" name="dueDate" type="date" />
          <label htmlFor="appt"> Hour: </label>
          <input
            className="hourInput"
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            required
          ></input>
          <button disabled={!title} class="success button" type="submit">
            Add
          </button>
        </form>
      </div>
    </CSSTransition>
  ) : (
    <div className="buttonWrapper">
      <CSSTransition
        key="2"
        mountOnEnter={true}
        unmountOnExit={true}
        classNames="button"
        appear={true}
        in={true}
        timeout={800}
      >
        <button onClick={() => setIsAdding(true)} className="button expanded">
          NEW
        </button>
      </CSSTransition>
    </div>
  );
};

export default TodoForm;
