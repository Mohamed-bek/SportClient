import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoB from "../images/logoB.png";
import LogoW from "../images/logoW.png";
import "../CSS/Landing.css";
import { userStore } from "../context/UserContext";
import { FaMoon } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
function Header() {
  const { updateUser } = userStore();
  const [DarkMode, setDarkMode] = useState(
    window.localStorage.getItem("DarkMode")
  );
  const [logoImg, setlogoImg] = useState(LogoW);
  const { user } = userStore();
  const ul = useRef();
  const slide = useRef();
  const logout = useRef();
  const [Index, setIndex] = useState();
  const [Links, setLinks] = useState(
    user?.role === "doctor"
      ? [
          { id: 5, to: "", name: "الرئيسية" },
          { id: 4, to: "/services", name: "الخدمات" },
          { id: 3, to: "about", name: "من نحن" },
          { id: 2, to: "contact", name: "اتصل بنا" },
          { id: 1, to: "programe", name: "برانامج" },
          { id: 0, to: "myClients", name: "مرضاي" },
        ]
      : user?.role === "admin"
      ? [
          { id: 1, to: "/", name: "طلبات البرامج" },
          { id: 0, to: "/doctors", name: "الأطباء" },
        ]
      : [
          { id: 4, to: "", name: "الرئيسية" },
          { id: 3, to: "/services", name: "الخدمات" },
          { id: 2, to: "about", name: "من نحن" },
          { id: 1, to: "contact", name: "اتصل بنا" },
          { id: 0, to: "/myPrograme", name: "برنامجي" },
        ]
  );
  const LogOut = () => {
    updateUser(null);
    window.location.href = "/";
  };
  const Location = useLocation().pathname;
  const Slayder = (i) => {
    slide.current.style.display =
      slide.current.style.display !== "block" ? "block" : "";
    slide.current.style.left = `${
      (100 / Links.length) * i + 100 / (Links.length * 2)
    }%`;
    if (ul.current) {
      ul.current.classList.toggle("active");
    }
    setIndex(i);
  };
  useEffect(() => {
    if (document.querySelector(".Header ul li a.active")) {
      Slayder(document.querySelector(".Header ul li a.active").dataset.index);
    }
    if (Location.split("/")[1] === "dashbord") {
      slide.current.style.display = "none";
    }
    if (DarkMode === "true" || DarkMode === true) {
      setlogoImg(LogoB);
    }
  }, []);
  return (
    <div className="Header animate__animated animate__slideInDown animate__delay-0 animate__faster">
      <div
        className="BurgerIcon"
        onClick={() => {
          ul.current.classList.toggle("active");
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="Logo">
        <img src={logoImg} alt="" />
      </div>
      <ul ref={ul}>
        <div ref={slide} className="after"></div>
        {Links.map((link) => (
          <li key={link.id}>
            {" "}
            <NavLink
              data-index={link.id}
              to={link.to}
              onClick={() => Slayder(link.id)}
            >
              {" "}
              {link.name}{" "}
            </NavLink>{" "}
          </li>
        ))}
      </ul>
      <div className="moon">
        <FaMoon
          className="mn"
          onClick={() => {
            window.localStorage.setItem(
              "DarkMode",
              JSON.stringify(
                !JSON.parse(window.localStorage.getItem("DarkMode"))
              )
            );
            document.documentElement.classList.toggle("active");
            if (logoImg === LogoB) {
              setlogoImg(LogoW);
            } else {
              setlogoImg(LogoB);
            }
          }}
        />
        {!user && (
          <NavLink to="Login" className="BtnLog">
            تسجيل الدخول
          </NavLink>
        )}
        {user && (
          <div
            onClick={() => {
              logout.current.classList.toggle("active");
            }}
            className="profile-btn"
          >
            <p> {user?.firstName?.[0]} </p>
            <div ref={logout} onClick={() => LogOut()} className="logout">
              {" "}
              <CiLogout />
              تسجيل الخروج
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
