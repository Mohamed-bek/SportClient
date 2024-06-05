import React, { useState, createContext, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "animate.css";
import "./CSS/App.css";
import LogSIng from "./Components/LogSIng";
import MainPage from "./Components/MainPage";
import Loading from "./Components/Loading";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import Home from "./Components/Home";
import Doctors from "./Components/Doctors";
import ProgrameDetails from "./Components/ProgrameDetails";

import NotFound from "./Components/NotFound";

import { userStore } from "./context/UserContext";
import Programe from "./Components/Programe";
import ProgrameRequest from "./Components/ProgrameRequest";
import MyPrograme from "./Components/MyPrograme";
import AddPrograme from "./Components/AddPrograme";
import { IoMdAdd } from "react-icons/io";
import MyClients from "./Components/MyClients";

export const AppContext = createContext();

function App() {
  const { user } = userStore();
  // ------- States ----------------------------------------------------
  const [OnLoad, setOnLoad] = useState(false);
  const [DarkMode, setDarkMode] = useState(
    window.localStorage.getItem("DarkMode")
  );

  // ------------------------------ Router ---------------------------------------------- //
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route
          path=""
          element={user?.role === "admin" ? <ProgrameRequest /> : <MainPage />}
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="programeRequest" element={<ProgrameRequest />} />
        <Route path="myPrograme" element={<MyPrograme />} />
        <Route path="myClients" element={<MyClients />} />
        <Route path="programeDetails" element={<ProgrameDetails />} />
        <Route
          path="doctors"
          element={user?.role === "admin" ? <Doctors /> : <NotFound />}
        />
        <Route path="addPrograme/:id" element={<AddPrograme />} />
        <Route
          path="programe"
          element={user?.role === "doctor" ? <Programe /> : <NotFound />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="Login"
          element={!user ? <LogSIng /> : <Navigate to="/" />}
        />
      </Route>
    )
  );

  useEffect(() => {
    setTimeout(() => {
      setOnLoad(false);
    }, 3000);
    if (DarkMode === "true" || DarkMode === true) {
      document.documentElement.classList.add("active");
    }
  }, []);

  return (
    <div className="App">
      {OnLoad ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="Container">
            <AppContext.Provider>
              <RouterProvider router={router} />
            </AppContext.Provider>
          </div>
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
}
export default App;
