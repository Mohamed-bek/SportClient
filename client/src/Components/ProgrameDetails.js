import React, { useState, useEffect } from "react";
import { programeStore } from "../context/UserContext";

function ProgrameDetails() {
  const { programe } = programeStore();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (programe && programe.youtubeLinks) {
      setExercises(programe.youtubeLinks);
    }
    console.log(programe.pdfFile);
  }, [programe]);

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="ProgrameRequest">
      <h1> برنامجي الرياضي </h1>
      <div className="down">
        <p> لتحميل البرنامج اظغط هنا </p>
        <button>
          <a
            href={`http://localhost:8000/${programe?.pdfFile}`}
            target="_blank"
            download
          >
            تحميل
          </a>
        </button>
      </div>
      <div className="ex">
        {exercises.map((exercise, index) => (
          <div key={index} className="MyExr">
            <div>
              <div>
                {" "}
                <span> اسم التمرين {index + 1} : </span> {exercise.name}{" "}
              </div>
              <div>
                {" "}
                <span> عدد الجولات :</span> {exercise.rounds}{" "}
              </div>
              <div>
                {" "}
                <span>عدد التكرارات :</span> {exercise.repetitions}
              </div>
            </div>
            {exercise.link ? (
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    exercise.link
                  )}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div>Link not provided</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgrameDetails;
