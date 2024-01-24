import React from "react";
import { useNavigate } from "react-router-dom";

export function ProfileNavBar() {
  function disconnect  () {
    const navigate = useNavigate()
    navigate(`/`);
  };
  return (
    <>
      <div className="spaceEvenlyButtons">
        <button className="button" onClick={disconnect}>
          Disconnect
        </button>
        <button className="button">Post a ride</button>
      </div>
    </>
  );
}
