import Login from "./Login";
import { useEffect } from "react";
import SignIn from "./SignIn";
import "../CSS/LogSing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { userStore } from "../context/UserContext";

function LogSIng() {
  const { user } = userStore();
  useEffect(() => {
    if (document.querySelector(".Header")) {
      document.querySelector(".Header").style.display = "none";
    }

    return () => {
      if (document.querySelector(".Header")) {
        document.querySelector(".Header").style.display = "flex";
      }
    };
  }, []);

  const up = (e) => {
    e.target.parentElement.classList.add("active");
  };
  const down = (e) => {
    if (e.target.value === "") {
      e.target.parentElement.classList.remove("active");
    }
  };
  return (
    <div className="LogSing animate__animated animate__zoomIn animate__delay-0.2s">
      <div className="container">
        <div className="btn">
          <NavLink to="/">
            {" "}
            <FontAwesomeIcon className="icon" icon={faXmark} />{" "}
          </NavLink>
        </div>
        <Login up={up} down={down} />
        <SignIn up={up} down={down} />
      </div>
    </div>
  );
}

export default LogSIng;
