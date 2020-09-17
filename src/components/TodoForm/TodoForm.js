import React, { useState } from "react";
import "./TodoForm.css";
import { CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    transition: "transform 0.6s background-color 0.7s",
  },
});
const TodoForm = ({ addTodo }) => {
  const classes = useStyles();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const add = (e, selectedDate) => {
    addTodo(e, selectedDate);
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
        <form className="TodoForm" onSubmit={(e) => add(e, selectedDate)}>
          <TextField
            id="standard-basic"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            name="title"
          />
          <TextField
            multiline={true}
            name="description"
            id="standard-basic"
            label="Standard"
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Due date:"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              ampm={false}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>

          <button disabled={!title} className="success button" type="submit">
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
        in={!isAdding}
        timeout={800}
      >
        <Button
          variant="outlined"
          onClick={() => setIsAdding(true)}
          color="primary"
          classes={{ root: classes.root }}
        >
          New
        </Button>
      </CSSTransition>
    </div>
  );
};

export default TodoForm;
