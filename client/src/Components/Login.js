import React, { useState, useRef } from "react";
import LogImgB from "../images/LoginBlue.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { userStore } from "../context/UserContext";

function Login(props) {
  const password_err = useRef();
  const email_err = useRef();
  const { updateUser } = userStore();

  const [TypeVis, setTypeVis] = useState(false);
  const [InfoLog, setInfoLog] = useState({
    email: "",
    password: "",
  });

  const ChangeType = (e) => {
    document.querySelectorAll(".LogForm .AfterInp .see").forEach((icon) => {
      icon.classList.toggle("active");
    });
    if (TypeVis) {
      document.querySelector(".LogForm .AfterInp.Pass .password").type =
        "password";
    } else {
      document.querySelector(".LogForm .AfterInp.Pass .password").type = "text";
    }
    setTypeVis(!TypeVis);
  };

  const Changer2 = () => {
    document.querySelector(".LogForm").classList.add("active");
    document.querySelector(".SignForm").classList.add("active");
    document.querySelector(".LogImg").classList.add("active");
    document.querySelector(".SignImg").classList.add("active");
  };

  // const LoginHandler = async (e) => {
  //   e.preventDefault();
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify(InfoLog),
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   const res = await fetch("/login", options);
  //   const json = await res.json();
  //   if (res.ok) {
  //     email_err.current.innerHTML = "";
  //     password_err.current.innerHTML = "";
  //     window.location.assign("/");
  //   } else {
  //
  //   }
  // };

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        ...InfoLog,
      });
      if (typeof window !== "undefined") {
        updateUser(data.user);
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response.data.error.includes("Email does not exist")) {
        email_err.current.innerHTML = "Email does not exist";
      }
      if (error.response.data.error.includes("pasPassword is incorrectsword")) {
        password_err.current.innerHTML = "pasPassword is incorrectsword";
      }
      if (error.response.data.error.includes("All Information is required")) {
        password_err.current.innerHTML = "Please Enter Password";
        email_err.current.innerHTML = "Please Enter Email";
      }
    }
  };

  return (
    <div className="Log" style={{ direction: "rtl", textAlign: "right" }}>
      <div className="LogForm">
        <div className="container">
          <div className="LogCont">
            <div>
              <h1>تسجيل الدخول إلى حسابك</h1>
              <p>مرحبًا بعودتك!</p>
              <form onSubmit={(e) => LoginHandler(e)}>
                <div className="AfterInp" data-plac="البريد الإلكتروني">
                  <input
                    type="text"
                    onChange={(e) =>
                      setInfoLog({ ...InfoLog, email: e.target.value })
                    }
                    value={InfoLog.email}
                    onFocus={(e) => props.up(e)}
                    onBlur={(e) => props.down(e)}
                  />
                  <FontAwesomeIcon className="icon" icon={faUser} />
                </div>
                <div className="err" ref={email_err}></div>
                <div className="AfterInp Pass" data-plac="كلمة المرور">
                  <FontAwesomeIcon className="icon" icon={faLock} />
                  <input
                    type="password"
                    className="password"
                    onChange={(e) =>
                      setInfoLog({ ...InfoLog, password: e.target.value })
                    }
                    value={InfoLog.password}
                    onFocus={(e) => props.up(e)}
                    onBlur={(e) => props.down(e)}
                  />
                  <FontAwesomeIcon
                    className="see"
                    icon={faEye}
                    onClick={(e) => ChangeType(e)}
                  />
                  <FontAwesomeIcon
                    className="see active"
                    icon={faEyeSlash}
                    onClick={(e) => ChangeType(e)}
                  />
                </div>
                <div className="err" ref={password_err}></div>
                <div className="under">
                  <div className="Inpchek">
                    <input type="checkbox" id="chek" />
                    <label htmlFor="chek">تذكرني</label>
                  </div>
                  <div className="Frgt">هل نسيت كلمة المرور؟</div>
                </div>
                <input type="submit" value="تسجيل الدخول" />
                <div className="RegNow">
                  ليس لديك حساب؟
                  <span onClick={() => Changer2()}>إنشاء حساب</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="LogImg">
        <img src={LogImgB} alt="" />
      </div>
    </div>
  );
}

export default Login;
