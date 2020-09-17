import React, { useState } from "react";
import "./TodoItem.css";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CSSTransition } from "react-transition-group";
import Chip from "@material-ui/core/Chip";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    height: "60px",
    fontSize: "1.2rem",
  },
});
const TodoItem = ({
  todo,
  markComplete,
  deleteTodo,
  editTodo,
  click,
  isClicked,
}) => {
  const { id, created_at, updated_at, due_date, title, description } = todo;
  const [edit, setEdit] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const setUpdateDate = () => {
    todo.updated_at = new Date();
  };
  const classes = useStyles();
  return (
    <li className="todoItem " key={id}>
      {edit ? (
        <form
          onSubmit={(e) => {
            editTodo(e, id);
            setEdit(!edit);
            setUpdateDate();
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
            <DoneIcon />
          </button>
        </form>
      ) : (
        <>
          <Chip
            classes={{ root: classes.root }}
            color="primary"
            deleteIcon={<DoneIcon />}
            onDelete={() => markComplete(id)}
            label={title}
            icon={<AssignmentIcon />}
            onClick={() => {
              if (!isClicked || showPop) {
                setShowPop(!showPop);

                click();
              }
            }}
          />

          {showPop ? (
            <CSSTransition
              in={showPop}
              appear={true}
              timeout={0}
              classNames="pop"
            >
              <div className="card">
                <div className="card-divider">
                  <div className="labelDate">
                    Created <div className=" cardDate">{created_at}</div>
                  </div>

                  <div className="labelDate">
                    Planned due date
                    <div className="mx-auto cardDate"> {due_date}</div>
                  </div>
                  <div className="labelDate">
                    Last updated:
                    <div className="mx-auto cardDate">
                      {" "}
                      {updated_at ? updated_at.toLocaleDateString() : "none"}
                    </div>
                  </div>
                </div>
                <div className="card-section">
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </div>
            </CSSTransition>
          ) : (
            ""
          )}
        </>
      )}
      <button onClick={() => deleteTodo(id)} className="deleteButton">
        <DeleteForeverIcon />
      </button>
      {!edit ? (
        <button
          className="editButton"
          onClick={() => {
            if (!showPop) setEdit(!edit);
          }}
        >
          {" "}
          <EditIcon />
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
