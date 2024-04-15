import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Header/Header";
import { useAppSelector } from "./store/hooks";
import { LoginModal } from "./Modals/Login/LoginModal";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Users } from "./Components/Users/Users";
import { UserModal } from "./Modals/User/UserModal";
import { Polling } from "./Components/Polling";

function App() {
  const curModal = useAppSelector((state) => state.modal);

  return (
    <div className={"h-screen max-h-full w-full flex flex-col overflow-hidden"}>
      <Header />
      <div className={"flex flex-row h-full w-full"}>
        <Sidebar />
        <div className={"overflow-scroll w-full h-full"}>
          <Routes>
            <Route path={"/"} element={<Users />} />
            <Route path={"/friends"} element={<Home />} />
          </Routes>
        </div>
        <Polling />
      </div>

      {(curModal.isOpen && curModal.type === "login" && (
        <div className={"absolute h-full w-full z-50 inset-0"}>
          <LoginModal />
        </div>
      )) ||
        (curModal.type === "user" && (
          <div className={"absolute h-full w-full z-50 inset-0"}>
            <UserModal />
          </div>
        ))}
    </div>
  );
}

export default App;
