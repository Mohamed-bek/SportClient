import axios from "axios";
import React, { useEffect, useState } from "react";
import { userStore } from "../context/UserContext";

function MyClients() {
  const { user } = userStore();
  const [clients, setclients] = useState([]);
  const getClient = async () => {
    try {
      const { data } = await axios.get("/clients/" + user?._id);
      console.log("the data is : ", data);
      setclients(data.clients);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClient();
  }, []);
  return (
    <div className="ProgrameRequest">
      <div className="clientInfo">
        <div> الاسم </div>
        <div> اللقب </div>
        <div> الجنس </div>
        <div> كلمة السر </div>
      </div>
      {clients.map((client) => (
        <div className="clientInfo">
          <div> {client?.firstName} </div>
          <div>{client?.lastName} </div>
          <div> {client?.gender} </div>
          <div> {client?._id} </div>
        </div>
      ))}
    </div>
  );
}

export default MyClients;
