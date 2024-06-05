import { NavLink } from "react-router-dom";
import "../CSS/Notfound.css";
import ErrorBl from "../images/OppsBl.png";

export default function NotFound() {
  return (
    <div className="Not-found">
      <div className="Cont">
        <div className="info">
          <h1>
            {" "}
            Oooops !<span></span>
            <span></span>
            <span></span>
          </h1>
          <p> we can't seem to find a page you are looking for </p>
          <NavLink
            to="/"
            onClick={() =>
              (document.querySelector(".Header ul .after").style.display =
                "block")
            }
          >
            <button> back to home </button>
          </NavLink>
        </div>
        <div className="img-cont">
          <img src={ErrorBl} alt="" />
        </div>
      </div>
    </div>
  );
}
