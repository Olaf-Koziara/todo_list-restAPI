import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import Done from "../views/Done/Done";
import axios from "axios";

const Router = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/Olaf-Koziara/jsonserverTodos/todos",
        {},
      )
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      });
  }, []);
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact={true} path="/">
            <App todos={todos} setTodos={setTodos} />
          </Route>
          <Route exact to="/Done">
            <Done todos={todos} setTodos={setTodos} />
          </Route>
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Router;
