import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";

const App = ({ setTodos, todos }) => {
  const [clicked, setClicked] = useState(false);
  const clickOnItem = () => {
    setClicked(!clicked);
  };
  const markComplete = (id) => {
    console.log(id);
    const markedTodos = todos.map((todo) => {
      if (id === todo.id) {
        todo.completed = true;
        todo.date = new Date().toUTCString();
      }
      return todo;
    });
    axios.patch(`http://localhost:5000/todos/${id}`, {
      completed: true,
    });

    setTodos(markedTodos);
    setClicked(false);
  };

  const addTodo = (e, selectedDate) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    console.log(selectedDate);
    const due_date = selectedDate;
    const created_at = new Date().toString().substr(0, 21);

    axios
      .post(`http://localhost:5000/todos`, {
        title,
        description,
        due_date,
        created_at,
      })
      .then((response) => setTodos([...todos, response.data]));

    e.target.reset();
  };
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then((response) => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    });
    setClicked(false);
  };
  const editTodo = (e, id) => {
    e.preventDefault();
    const newTitle = e.target.title.value;

    axios
      .patch(`http://localhost:5000/todos/${id}`, {
        title: newTitle,
      })
      .then((response) => {
        const updatedToDos = todos.map((todo) => {
          if (todo.id === id) {
            todo.title = newTitle;
          }
          return todo;
        });
        setTodos(updatedToDos);
      });
  };

  return (
    <div className="App">
      <TodoList
        todos={todos}
        markComplete={markComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        clickOnItem={clickOnItem}
        isClicked={clicked}
      />
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

export default App;
