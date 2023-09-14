import React from "react";
import "./App.css";
import NavBar from "./layout/NavBar";
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import ListUsers from "./components/ListUsers";
import ViewUser from "./components/ViewUser";
import NotFound404 from "./components/NotFound404";
import ToastContainerComponent from "./components/ToastContainerComponent";

const App: React.FC = () => {
  return (
    <>
      <ToastContainerComponent />

      <NavBar />
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/create-user" element={<RegisterUser />} />
        <Route path="/edit-user/:id" element={<RegisterUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      
    </>
  );
};

export default App;
