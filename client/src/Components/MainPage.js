import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../CSS/Landing.css";
import "../CSS/Serv-About-Cont.css";
// import "../CSS/Testimonial.css";
import Landing from "./Landing";

export default function MainPage() {
  return (
    <div className="MainPage">
      <Landing />
    </div>
  );
}
