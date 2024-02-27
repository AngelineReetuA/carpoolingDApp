import React from "react";
import { useNavigate } from "react-router-dom";


export function ProfileNavBar() {
  const navigate = useNavigate()
  function disconnect  () {
    navigate(`/`);
  };
  return (
    <>
      <div className="spaceEvenlyButtons">
        <button className="button" onClick={disconnect}>
          Disconnect
        </button>
        <button className="button">Post a ride</button>
        <button className="button">Profile</button>
      </div>
    </>
  );
}
