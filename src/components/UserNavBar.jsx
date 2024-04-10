import React from "react";
import { useState } from "react";
import "../styles/App.css";
import { RideTable } from "./RideTable";
import { MyRides } from "./MyRides";
import { PostRide } from "./PostRide";
import { LogoutPage } from "../pages/LogoutPage";
import { useNavigate } from "react-router-dom";

export function UserNavBar() {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState(1);

  const handleSelect = (id) => {
    console.log(id);
    setSelectedState(id);
  };

  function logout() {
    navigate(`/logout`);
  }

  return (
    <>
      <div className="options">
        <span
          className="option"
          style={{ fontWeight: selectedState === 1 ? "bolder" : "" }}
          onClick={() => handleSelect(1)}
        >
          Open Rides
        </span>
        <span
          className="option"
          style={{ fontWeight: selectedState === 2 ? "bolder" : "" }}
          onClick={() => handleSelect(2)}
        >
          Rides Joined
        </span>
        <span
          className="option"
          style={{ fontWeight: selectedState === 3 ? "bolder" : "" }}
          onClick={() => handleSelect(3)}
        >
          POST RIDE
        </span>
        <span className="optionRight" onClick={logout}>
          Logout
        </span>
      </div>

      <div className="hr"></div>
      {selectedState === 1 && <RideTable />}
      {selectedState === 2 && <MyRides />}
      {selectedState === 3 && <PostRide />}
    </>
  );
}
