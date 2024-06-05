/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import LogoTel from "../images/icons8-telegram-50.png";
import LogoMessBl from "../images/mail.png";
import LogoMail from "../images/icons8-letter-with-email-sign-50.png";
import LogoPhone from "../images/icons8-phone-64.png";
import facebookImg from "../images/facebook.png";
import LogoMap from "../images/icons8-map-24.png";

function Contact() {
  const [ContactInfo, setContactInfo] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Message: "",
  });
  return (
    <div
      className="Contact animate__animated animate__bounceInLeft delay-1"
      id="Contact"
    >
      <div className="cont">
        <h1 className="animate__animated animate__bounceInDown delay-2">
          اتصل <span>بنا</span>
        </h1>
        <div className="Cntnr">
          <div className="boxForm">
            <div className="head">
              <h1>
                <span>أرسل</span> رسالة
              </h1>
              <img src={LogoMessBl} alt="" />
            </div>
            <form>
              <div className="FormDiv">
                <div className="inpCont">
                  <label>الاسم </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setContactInfo({
                        ...ContactInfo,
                        FirstName: e.target.value,
                      })
                    }
                    name="FisrtName"
                    value={ContactInfo.FirstName}
                  />
                </div>
                <div className="inpCont">
                  <label> اللقب </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setContactInfo({
                        ...ContactInfo,
                        LastName: e.target.value,
                      })
                    }
                    name="LastName"
                  />
                </div>
              </div>
              <div className="FormDiv">
                <div className="inpCont">
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setContactInfo({ ...ContactInfo, Email: e.target.value })
                    }
                    name="Email"
                  />
                </div>
                <div className="inpCont">
                  <label>رقم الهاتف</label>
                  <input
                    type="number"
                    onChange={(e) =>
                      setContactInfo({ ...ContactInfo, Phone: e.target.value })
                    }
                    name="Phone"
                  />
                </div>
              </div>
              <div className="FormDiv">
                <div className="inpCont">
                  <label>الرسالة</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setContactInfo({
                        ...ContactInfo,
                        Message: e.target.value,
                      })
                    }
                    name="Message"
                  />
                </div>
                <button
                  onClick={(e) => {
                    console.log(ContactInfo);
                    e.preventDefault();
                  }}
                >
                  <img src={LogoTel} alt="" />
                </button>
              </div>
            </form>
          </div>
          <div className="boxInfo">
            <h1>معلومات الاتصال</h1>
            <div className="DivInfo">
              <img src={LogoMap} alt="" />
              <a>الجزائر - قسنطينة</a>
            </div>
            <div className="DivInfo">
              <img src={LogoPhone} alt="" />
              <a href="tel:+0796305015">15 50 30 96 07 </a>
            </div>
            <div className="DivInfo">
              <img src={LogoPhone} alt="" />
              <a href="tel:+0793764811">11 48 76 93 07 </a>
            </div>
            <div className="DivInfo">
              <img src={LogoMail} alt="" />
              <a href="mailto:healthsportconnect@gmail.com">
                healthsportconnect@gmail.com
              </a>
            </div>
            <div className="DivInfo">
              <a
                target="_blank"
                className="facebook"
                href="https://www.facebook.com/profile.php?id=61560355509896"
              >
                <img src={facebookImg} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
