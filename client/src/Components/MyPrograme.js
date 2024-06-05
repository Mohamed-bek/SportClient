import axios from "axios";
import React, { useEffect, useState } from "react";
import { programeStore } from "../context/UserContext";

function MyPrograme() {
  const [password, setpassword] = useState();
  const { programe, updatePrograme } = programeStore();
  const loginToPrograme = async (password) => {
    try {
      const { data } = await axios.get("/myPrograme/" + password);
      updatePrograme(data.programe);
      window.location.href = "/programeDetails";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (programe) loginToPrograme(programe?._id);
  }, []);
  return programe ? (
    <div> Yes programe </div>
  ) : (
    <div className="ProgrameRequest MyPrograme">
      <div>
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="كلمة السر"
        />
        <button onClick={() => loginToPrograme(password)}> دخول </button>
      </div>
    </div>
  );
}

export default MyPrograme;
