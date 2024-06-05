import React, { useState } from "react";
import SignImgBl from "../images/SignBlue.png";
import { FaPhone } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faCalendarDays,
  faLock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import axios from "axios";
import { userStore } from "../context/UserContext";

function SignIn(props) {
  const { updateUser } = userStore();
  const Changer1 = () => {
    document.querySelector(".LogForm").classList.remove("active");
    document.querySelector(".SignForm").classList.remove("active");
    document.querySelector(".LogImg").classList.remove("active");
    document.querySelector(".SignImg").classList.remove("active");
  };
  const [InfoSign, setInfoSign] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    gender: "men",
    specialite: "مختص_جراحة_العظام_و_المفاصل",
    phoneNumber: "",
  });
  const [TypeVis, setTypeVis] = useState(false);
  const ChangeType = () => {
    document.querySelectorAll(".SignForm .AfterInp .see").forEach((icon) => {
      icon.classList.toggle("active");
    });
    if (TypeVis) {
      document.querySelector(".SignForm .AfterInp .password").type = "password";
    } else {
      document.querySelector(".SignForm .AfterInp .password").type = "text";
    }
    setTypeVis(!TypeVis);
  };

  const Sign = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("./signup", {
        ...InfoSign,
      });
      setInfoSign({
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        password: "",
        gender: "men",
        specialite: "مختص_جراحة_العظام_و_المفاصل",
        phoneNumber: "",
      });
      updateUser(data?.user || null);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const GenderChanger = (e) => {
    document
      .querySelectorAll(".SignCon .gender .GenImg .icon")
      .forEach((icon) => {
        icon.parentElement.classList.remove("active");
      });
    e.target.parentElement.classList.add("active");
    setInfoSign({ ...InfoSign, gender: e.target.getAttribute("value") });
  };
  return (
    <div className="SignIn" style={{ direction: "rtl", textAlign: "right" }}>
      <div className="SignImg">
        <img src={SignImgBl} alt="" />
      </div>
      <div className="SignForm">
        <div className="SignCon">
          <h1>مرحبًا !</h1>
          <form onSubmit={(e) => Sign(e)}>
            <div className="names">
              <div
                className="AfterInp"
                onFocus={(e) => props.up(e)}
                onBlur={(e) => props.down(e)}
                data-plac="الاسم الأول"
              >
                <input
                  type="text"
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, firstName: e.target.value })
                  }
                  value={InfoSign.firstName}
                />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
              <div
                className="AfterInp"
                onFocus={(e) => props.up(e)}
                onBlur={(e) => props.down(e)}
                data-plac="الاسم الأخير"
              >
                <input
                  type="text"
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, lastName: e.target.value })
                  }
                  value={InfoSign.lastName}
                />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
            </div>
            <div className="names">
              <div
                className="AfterInp"
                onFocus={(e) => props.up(e)}
                onBlur={(e) => props.down(e)}
                data-plac="تاريخ الميلاد"
              >
                <input
                  type="text"
                  minLength={10}
                  maxLength={10}
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, birthday: e.target.value })
                  }
                  value={InfoSign.birthday}
                />
                <FontAwesomeIcon className="icon" icon={faCalendarDays} />
              </div>
              <div
                className="AfterInp"
                onFocus={(e) => props.up(e)}
                onBlur={(e) => props.down(e)}
                data-plac="رقم الهاتف"
              >
                <input
                  type="text"
                  minLength={10}
                  maxLength={10}
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, phoneNumber: e.target.value })
                  }
                  value={InfoSign.phoneNumber}
                />
                <FaPhone className="icon" />
              </div>
            </div>
            <div
              className="AfterInp"
              onFocus={(e) => props.up(e)}
              onBlur={(e) => props.down(e)}
              data-plac="البريد الإلكتروني"
            >
              <input
                type="email"
                onChange={(e) =>
                  setInfoSign({ ...InfoSign, email: e.target.value })
                }
                value={InfoSign.email}
              />
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </div>

            <div
              className="AfterInp"
              onFocus={(e) => props.up(e)}
              onBlur={(e) => props.down(e)}
              data-plac="كلمة المرور"
            >
              <input
                type="password"
                className="password"
                onChange={(e) =>
                  setInfoSign({ ...InfoSign, password: e.target.value })
                }
                value={InfoSign.password}
              />
              <FontAwesomeIcon
                className="see"
                onClick={() => ChangeType()}
                icon={faEye}
              />
              <FontAwesomeIcon
                className="see active"
                onClick={() => ChangeType()}
                icon={faEyeSlash}
              />
              <FontAwesomeIcon className="icon" icon={faLock} />
            </div>
            <div className="AfterInp">
              <FontAwesomeIcon className="icon" icon={faCheck} />
              <select
                onChange={(e) => {
                  setInfoSign({ ...InfoSign, specialite: e.target.value });
                }}
              >
                <option value="مختص_جراحة_العظام_و_المفاصل">
                  مختص جراحة العظام و المفاصل
                </option>
                <option value="مختص_في_أمراض_الغدد_الصماء_و_السكري">
                  مختص في أمراض الغدد الصماء و السكري
                </option>
                <option value="مختص_في_أمراض_الرئة_و_الحساسية">
                  مختص في أمراض الرئة و الحساسية
                </option>
                <option value="مختص_في_أمراض_القلب">مختص في أمراض القلب</option>
                <option value="مختص_في_أمراض_النساء_و_التوليد">
                  مختص في أمراض النساء و التوليد
                </option>
              </select>
            </div>
            <div className="AfterInp">
              <FontAwesomeIcon className="icon" icon={faCheck} />
              <select
                onChange={(e) =>
                  setInfoSign({ ...InfoSign, gender: e.target.value })
                }
              >
                <option value="men"> رجل </option>
                <option value="women">امرأة</option>
              </select>
            </div>
            <input type="submit" value="تسجيل" />
            <div className="LogNow">
              لديك حساب؟
              <span onClick={() => Changer1()}> تسجيل الدخول الآن </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
