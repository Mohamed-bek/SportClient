import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddPrograme() {
  const { id } = useParams();
  const [pdfFile, setPdfFile] = useState();
  const fileRef = useRef();
  const exiresesRef = useRef();
  useEffect(() => {}, [id]);
  const [exercises, setExercises] = useState([
    {
      name: "",
      rounds: "",
      repetitions: "",
      link: "",
    },
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        name: "",
        rounds: "",
        repetitions: "",
        link: "",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExercises = exercises.map((exercise, idx) =>
      idx === index ? { ...exercise, [name]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (pdfFile) {
      data.append("pdfFile", pdfFile);
    }
    data.append("youtubeLinks", JSON.stringify(exercises));
    data.append("id", id);

    try {
      const { status } = await axios.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="ProgrameRequest">
      <div className="con">
        <div className="filePdf">
          <label> ارفع ملف PDF للبرنامح </label>
          <button onClick={() => fileRef.current.click()}>
            {" "}
            ارفع ملف PDF{" "}
          </button>
          <input
            ref={fileRef}
            onChange={(e) => setPdfFile(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
          />
        </div>
        <div className="ex" ref={exiresesRef}>
          <div className="addExercice">
            <div> اسم التمرين </div>
            <div> عدد الجولاات </div>
            <div> عدد التكرارات </div>
            <div> رابط التمرين </div>
          </div>
          {exercises.map((exercise, index) => (
            <div key={index} className="addExercice exercices">
              <input
                type="text"
                name="name"
                placeholder="اسم التمرين"
                value={exercise.name}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                name="rounds"
                placeholder="عدد الجولاات"
                value={exercise.rounds}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                name="repetitions"
                placeholder="عدد التكرارات"
                value={exercise.repetitions}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                name="link"
                placeholder="رابط التمرين"
                value={exercise.link}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          ))}
        </div>
        <IoIosAdd className="iconAdd" onClick={addExercise} />
        <button onClick={(e) => handleSubmit(e)}> ارسال البرنامج </button>
      </div>
    </div>
  );
}

export default AddPrograme;
