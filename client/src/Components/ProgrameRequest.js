import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { userStore } from "../context/UserContext";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
function ProgrameRequest() {
  const popUpRef = useRef();
  const deleteRef = useRef();
  const { user } = userStore();
  const [programeReq, setProgrameReq] = useState([]);
  const [client, setClient] = useState(null);
  const getProgramRequests = async () => {
    try {
      const { data, status } = await axios.get("/programe-requests", {
        params: {
          id: user._id,
        },
      });
      setProgrameReq([...data.programes]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProgramRequests();
  }, []);
  function getAge(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  const deleteRequestPrograme = async () => {
    try {
      const { status } = await axios.delete("/programe-requests", {
        params: {
          id: user._id,
          programeId: client?._id,
        },
      });
      if (status === 200) {
        deleteRef.current.style.scale = 1;
        setTimeout(() => {
          deleteRef.current.style.scale = 0;
          popUpRef.current.style.scale = 0;
        }, 1000);
      }
    } catch (error) {
      console.log("the error");
      console.log(error);
    }
  };
  return (
    <div className="ProgrameRequest">
      <div ref={popUpRef} className="popUp">
        <div ref={deleteRef} className="delete">
          <h1> تم حذف الطلب بنجاح </h1>
        </div>
        <div
          onClick={() => {
            setClient(null);
            popUpRef.current.style.scale = 0;
          }}
          className="icon"
        >
          <IoMdClose />
        </div>
        <div className="contInfo">
          <div className="flx">
            <div>
              {" "}
              <span> الاسم :</span> <span> {client?.firstName} </span>{" "}
            </div>
            <div>
              {" "}
              <span> اللقب : </span> <span> {client?.lastName} </span>{" "}
            </div>
          </div>
          <div className="flx">
            <div>
              {" "}
              <span> العمر :</span> <span> {getAge(client?.birthday)} </span>{" "}
            </div>
            <div>
              {" "}
              <span> الجنس :</span>{" "}
              <span> {client?.gender === "men" ? "رجل" : "امرأة"} </span>{" "}
            </div>
          </div>
          <div className="flx">
            <div>
              {" "}
              <span> الوزن :</span> <span> {client?.weight} </span>{" "}
            </div>
            <div>
              {" "}
              <span> الطول :</span> <span> {client?.height} </span>{" "}
            </div>
          </div>
          {client?.healthProblems?.length > 0 ? (
            <div>
              <h2> مشاكل صحية :</h2>
              <ul>
                {client?.healthProblems.map((st) => (
                  <li> {st} </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2> لا توجد مشاكل صحية </h2>
          )}
          <div className="flxButton">
            {" "}
            <NavLink to={`addPrograme/${client?._id}`}>
              <button> اضف برنامج </button>
            </NavLink>{" "}
            <button onClick={() => deleteRequestPrograme()}> حذف الطلب </button>
          </div>
        </div>
      </div>
      <div className="Info">
        <div>الاسم و اللقب</div>
        <div>الجنس </div>
        <div>العمر </div>
        <div>
          {" "}
          الوزن <span className="hide">( كغ )</span>
        </div>
        <div>
          الطول <span className="hide">( سم )</span>
        </div>
      </div>
      <div className="content">
        {programeReq.map((pro) => (
          <div
            onClick={() => {
              setClient(pro);
              popUpRef.current.style.scale = 1;
            }}
            key={pro._id}
            className="Info"
          >
            <div>{pro?.firstName + " " + pro?.lastName}</div>
            <div> {pro?.gender === "men" ? "رجل" : "امرأة"}</div>
            <div> {getAge(pro?.birthday)} </div>
            <div>{pro?.weight} </div>
            <div>{pro?.height} </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgrameRequest;
