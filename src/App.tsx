import "./App.css";
import StudentList from "./components/StudentList";
import Student_Add from "./components/Student_Add";
import Student_Update from "./components/Student_Update";
import Student_Detail from "./components/Student_Detail";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={StudentList} exact></Route>
        <Route path="/add" component={Student_Add} exact></Route>
        <Route path="/update/:id" component={Student_Update} exact></Route>
        <Route path="/detail/:id" component={Student_Detail} exact></Route>
      </Switch>
    </Router>
  );
};

export default App;
