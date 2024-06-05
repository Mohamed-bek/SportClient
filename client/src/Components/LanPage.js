import React, { useEffect, useState } from "react";
import img1 from "../images/landing/1.png";
import img2 from "../images/landing/2.png";
import img3 from "../images/landing/3.png";
import img4 from "../images/landing/4.png";
import img5 from "../images/landing/5.png";

function LanPage() {
  const [ArrayImg, setArrayImg] = useState([img3, img4, img5, img1, img2]);
  const [el, setel] = useState(0);
  const [dir, setdir] = useState("r");
  const Slidet = () => {
    if (el <= ArrayImg.length - 1 && dir === "r") {
      document.querySelector(
        ".LanPage .Slider .ContSlider"
      ).style.transform = `translate(-${100 * (el + 1)}%)`;
      setel(el + 1);
      if (el === ArrayImg.length - 1) {
        document.querySelector(
          ".LanPage .Slider .ContSlider"
        ).style.transform = `translate(-${100 * (el - 1)}%)`;
        setdir("l");
        setel(el - 1);
      }
    }
    if (el > -1 && dir === "l") {
      document.querySelector(
        ".LanPage .Slider .ContSlider"
      ).style.transform = `translate(-${100 * (el - 1)}%)`;
      if (el === 0) {
        document.querySelector(
          ".LanPage .Slider .ContSlider"
        ).style.transform = `translate(-${100 * (el + 1)}%)`;
        setdir("r");
        setel(el + 1);
      } else {
        setel(el - 1);
      }
    }
  };
  useEffect(() => {
    const timer = setInterval(Slidet, 3000);
    return () => clearInterval(timer);
  });
  return (
    <div className="LanPage">
      <div className="Info  animate__animated  animate__fadeInLeft animate__delay-0.15s">
        <h1>
          طريقك نحو التميّز في
          <span> الصحة والجمال </span>
        </h1>
        <p>
          نحن رواد في تحقيق السعادة الصحية والجمال الرفاهي. نقدم لكم فرصة
          للقيادة نحو أسلوب حياة متوازن يجمع بين الصحة والجمال، مع التركيز على
          التميّز والراحة الشاملة. اكتشفوا معنا الطريق نحو السعادة الصحية
          والجمال الرفاهي، وابدؤا رحلتكم نحو الأفضل اليوم
        </p>
        <button> اكتشف أكثر </button>
      </div>
      <div className="Slider animate__animated animate__zoomIn animate__delay-0.15s ">
        <div className="ContSlider">
          {ArrayImg.map((e, i) => (
            <img key={i} src={e} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanPage;
