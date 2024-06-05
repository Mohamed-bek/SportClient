import axios from "axios";
import React, { useState, useEffect } from "react";

function Doctors() {
  const [oldDoctors, setoldDoctors] = useState([]);
  const [newDoctors, setnewDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const { data, status } = await axios.get("/doctors");
      if (status === 200) {
        setnewDoctors(data.newDoctors);
        setoldDoctors(data.oldDoctors);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  const activateDoctor = async (id) => {
    try {
      const { data } = await axios.put("/doctors/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDoctor = async (id) => {
    try {
      const { data } = await axios.delete("/doctors/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ProgrameRequest">
      <h1> اطبائنا </h1>
      <div className="doctors New">
        <div className="doctorInfo">
          <div> الاسم </div>
          <div> اللقب </div>
          <div> البريد الالكتروني </div>
          <div> رقم الهاتف </div>
          <div> التخصص </div>
        </div>
        {oldDoctors.map((doctor) => (
          <div className="doctorInfo">
            <div> {doctor.firstName} </div>
            <div> {doctor?.lastName} </div>
            <div> {doctor?.email} </div>
            <div> {doctor?.phoneNumber || "????"}</div>
            <div> {doctor?.specialite} </div>
          </div>
        ))}
      </div>
      <h1> طلبات الأطباء للانضمام الينا </h1>
      <div className="doctors Old">
        <div className="doctorInfo">
          <div> الاسم </div>
          <div> اللقب </div>
          <div> البريد الالكتروني </div>
          <div> رقم الهاتف </div>
          <div> التخصص </div>
          <div> تفعيل </div>
          <div> حذف </div>
        </div>
        {newDoctors.map((doctor) => (
          <div className="doctorInfo">
            <div> {doctor.firstName} </div>
            <div> {doctor?.lastName} </div>
            <div> {doctor?.email} </div>
            <div> {doctor?.phoneNumber || "????"}</div>
            <div> {doctor?.specialite} </div>
            <div>
              {" "}
              <button onClick={() => activateDoctor(doctor?._id)}>
                {" "}
                تفعيل{" "}
              </button>{" "}
            </div>
            <div>
              {" "}
              <button onClick={() => deleteDoctor(doctor?._id)}>
                {" "}
                حذف{" "}
              </button>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
