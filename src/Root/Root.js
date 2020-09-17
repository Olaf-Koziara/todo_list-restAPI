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
      .get("http://localhost:5000/todos", {
        params: {
          _limit: 20,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => setTodos(response.data));
  }, []);
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact={true} path="/">
            <App todos={todos} setTodos={setTodos} />
          </Route>
          <Route to="/Done">
            <Done todos={todos} setTodos={setTodos} />
          </Route>
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Router;
