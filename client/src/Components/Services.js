import React from "react";

function Services() {
  return (
    <div
      className="Services animate__animated animate__bounceInLeft delay-1"
      id="Services"
    >
      <div className="cont">
        <h1 className="animate__animated animate__bounceInDown delay-2">
          خدم<span>ات</span>
        </h1>
        <h2>
          {" "}
          نحن نقدم مجموعة واسعة من الخدمات المصممة خصيصًا لتلبية احتياجاتك
          الصحية والجمالية. تشمل خدماتنا ما يلي:{" "}
        </h2>
        <div className="ServCont">
          <ul className="ServiceList">
            <li>
              <span>الاستشارات الغذائية</span>
              تقييم حالتك الصحية ووضع برنامج غذائي مناسب لك
            </li>
            <li>
              <span>البرامج الرياضية</span>
              وضع برامج رياضية تناسب حالتك البدنية وأهدافك الصحية
            </li>
            <li>
              <span>الاستشارات النفسية</span>
              تقديم الدعم والاستشارات النفسية لتحسين صحتك النفسية والعاطفية
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Services;
