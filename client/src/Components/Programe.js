import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
import { userStore } from "../context/UserContext";

function Programe() {
  const failRef = useRef();
  const successRef = useRef();
  const { user } = userStore();
  const [InfoSign, setInfoSign] = useState({
    firstName: null,
    lastName: null,
    birthday: null,
    gender: "men",
    weight: null,
    height: null,
  });
  const [malads, setMalads] = useState([]);
  const up = (e) => {
    e.target.parentElement.classList.add("active");
  };
  const down = (e) => {
    if (e.target.value === "") {
      e.target.parentElement.classList.remove("active");
    }
  };
  const addMalad = (st) => {
    const indexOf = malads.indexOf(st);
    if (indexOf !== -1) {
      const newMalad = malads.splice(indexOf, 1);
      setMalads(newMalad);
    } else {
      setMalads([...malads, st]);
    }
  };
  const RequestFroPrograme = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post("/request-programe", {
        ...InfoSign,
        healthProblems: malads,
        doctorId: user._id,
      });
      if (status === 200) {
        successRef.current.style.scale = 1;
        setInfoSign({
          firstName: null,
          lastName: null,
          birthday: null,
          gender: "men",
          weight: null,
          height: null,
        });
        setMalads([]);
        window.location.reload();
      }
    } catch (error) {
      failRef.current.style.scale = 1;
    }
  };

  return (
    <div className="Programe">
      <div className="ref" ref={successRef}>
        <div>
          <h1>
            {" "}
            تم تقديم طلبك بنجاح. يرجى الانتظار لبضع ساعات حتى نقوم بإعداد
            البرنامج الغذائي{" "}
          </h1>
          <button
            onClick={() => {
              successRef.current.style.scale = 0;
            }}
          >
            {" "}
            حسنا{" "}
          </button>
        </div>
      </div>
      <div className="ref" ref={failRef}>
        <div>
          <h1> لم يتم تنفيذ طلبك بنجاح. يرجى المحاولة مرة أخرى بعد فترة.</h1>
          <button
            onClick={() => {
              failRef.current.style.scale = 0;
            }}
          >
            {" "}
            حسنا{" "}
          </button>
        </div>
      </div>
      <div>
        <div className="SignCon">
          <h1> معلومات المريض </h1>
          <form onSubmit={(e) => RequestFroPrograme(e)}>
            <div className="pr">
              <div
                className="AfterInp"
                onFocus={(e) => up(e)}
                onBlur={(e) => down(e)}
                data-plac="الاسم"
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
                onFocus={(e) => up(e)}
                onBlur={(e) => down(e)}
                data-plac=" اللقب"
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
            <div className="pr">
              <div
                className="AfterInp"
                onFocus={(e) => up(e)}
                onBlur={(e) => down(e)}
                data-plac=" الطول cm"
              >
                <input
                  type="text"
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, height: e.target.value })
                  }
                  value={InfoSign.height}
                />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
              <div
                className="AfterInp"
                onFocus={(e) => up(e)}
                onBlur={(e) => down(e)}
                data-plac=" الوزن kg"
              >
                <input
                  type="text"
                  onChange={(e) =>
                    setInfoSign({ ...InfoSign, weight: e.target.value })
                  }
                  value={InfoSign.weight}
                />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
            </div>
            <div
              className="AfterInp"
              onFocus={(e) => up(e)}
              onBlur={(e) => down(e)}
              data-plac=" تاريخ الميلاد DD/MM/YYYY "
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
            <div className="AfterInp">
              <FontAwesomeIcon className="icon" icon={faCheck} />
              <select
                onChange={(e) =>
                  setInfoSign({ ...InfoSign, gender: e.target.value })
                }
              >
                <option value="men"> رجل </option>
                <option value="women"> امرأة </option>
              </select>
            </div>
            <h2 className="h2"> مشاكل صحية </h2>
            {InfoSign.gender === "women" && (
              <div className="inputSelect">
                <input
                  id="postpartum"
                  className="select"
                  type="checkbox"
                  value="ما بعد الولادة"
                  onClick={(e) => addMalad(e.target.value)}
                />
                <label htmlFor="postpartum">ما بعد الولادة</label>
              </div>
            )}
            <div className="inputSelect">
              <input
                id="diabetes"
                className="select"
                type="checkbox"
                value="مريض بسكري"
                onClick={(e) => addMalad(e.target.value)}
              />
              <label htmlFor="diabetes">مريض بسكري</label>
            </div>
            <div className="inputSelect">
              <input
                onClick={(e) => addMalad(e.target.value)}
                id="asthma"
                className="select"
                type="checkbox"
                value="مريض بربو"
              />
              <label htmlFor="asthma">مريض بربو</label>
            </div>
            <div className="inputSelect">
              <input
                id="obesity"
                className="select"
                type="checkbox"
                value="مريض بسمنة"
                onClick={(e) => addMalad(e.target.value)}
              />
              <label htmlFor="obesity">مريض بسمنة</label>
            </div>
            <div className="inputSelect">
              <input
                id="heartDisease"
                className="select"
                type="checkbox"
                value="مريض بامراض القلب"
                onClick={(e) => addMalad(e.target.value)}
              />
              <label htmlFor="heartDisease">مريض بامراض القلب</label>
            </div>
            <input className="subm" type="submit" value="ارسال" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Programe;
