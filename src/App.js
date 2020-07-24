import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";

const App = ({ setTodos, todos }) => {
  const [lastID, setID] = useState(10);
  // const [counter, setCounter] = useState(0);
  // const [completed, setCompleted] = useState(false);
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
  };

  const addTodo = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const due_date = e.target.appt.value + " " + e.target.dueDate.value;
    const created_at = new Date().toString().substr(0, 21);
    console.log(due_date);

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
  };
  const editTodo = (e, id) => {
    e.preventDefault();
    const newTitle = e.target.title.value;
    console.log(newTitle);
    console.log(id);
    axios
      .put(`http://localhost:5000/todos/${id}`, {
        body: JSON.stringify({
          title: newTitle,
        }),
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
      />
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

export default App;
