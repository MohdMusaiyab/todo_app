import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/Login";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserTask from "./pages/UserTask";
import UpdateTask from "./pages/UpdateTask";
import About from "./pages/About";
import CreateTask from "./pages/CreateTask";
const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<LoginRegister></LoginRegister>}></Route>
        <Route path="/user-task/:id" element={<UserTask></UserTask>}></Route>
        <Route path="/update-task/:id" element={<UpdateTask></UpdateTask>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/create-task" element={<CreateTask></CreateTask>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
