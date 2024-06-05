import React, { useState, useEffect, useContext } from "react";
import imgAbout from "../images/About us page-amico.png";
import { AppContext } from "../App";

function About() {
  return (
    <div
      className="About animate__animated animate__bounceInLeft delay-1 "
      id="About"
    >
      <div className="cont">
        <h1 className="animate__animated animate__bounceInDown delay-2">
          من <span>نحن</span>
        </h1>
        <div className="AboutCont">
          <div className="Info">
            <p>
              نحن فريق متكامل من الخبراء في كل من المجال الرياضي - الرعاية
              النفسية . التغدية ملتزمون بتقدیم افضل وأسرع الخدمات مقابل مبالغ
              رمزية باستخدام اسرع الطرق و أحدث الأساليب , من أجل الوصول لراحتك
              يتصل فريقنا مباشرة بطبيبك الخاص لجمع أكبر كم من المعلومات و وضع
              البرنامج الخاص بك الرياضي الغذائي و النفسي . نحن هنا لدعمك و السير
              معك في جميع الخطوات
            </p>
          </div>
          <div className="imgCont">
            <img src={imgAbout} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
