import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";

export function MyRides() {
  const [rides, setRides] = useState([]);
  const loc = window.location.href;
  const parts = loc.split("/");
  const metamaskAddress = parts[parts.length - 2];

  useEffect(() => {
    async function fetchRides() {
      try {
        const response = await fetch("http://localhost:4000/get-rides");
        if (response.ok) {
          const ridesData = await response.json();
          ridesData.sort(
            (a, b) => new Date(a.StartingTime) - new Date(b.StartingTime)
          );
          for (const ride of ridesData) {
            if (ride.RidersUnames === metamaskAddress) {
              console.log("true");
              setRides([...rides, ride]);
              console.log(rides);
            }
          }
        } else {
          console.error("Failed to fetch rides:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    }

    fetchRides();
  }, []);
  function done(){
    swal("Tokens earned!","Your tokens will reach your wallet shortly","success")
  }
  return (
    <center>
      <div className="container">
        <h2 className="rideTableHeading">Rides you have joined</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-3">Time & Date</div>
            <div className="col col-3">Starting Area</div>
            <div className="col col-3">Via</div>
            <div className="col col-3">Destination</div>
            <div className="col col-3">Contact</div>
            <div className="col col-3"></div>
          </li>
          <li className="table-row">
            <div className="col col-3">12:30 PM 29/01/24</div>
            <div className="col col-3">Nehru St, Velacherry</div>
            <div className="col col-3">Anna Salai</div>
            <div className="col col-3">Chintadripet MRTS</div>
            <div className="col col-3">Abijith, 9080076521</div>
            <div className="col col-3">
              <button className="button" onClick={done}>Done</button>
            </div>
          </li>
          {rides?.map((ride) => (
            <li className="table-row" key={ride.ID}>
              <div className="col col-3">
                {ride.StartingTime}
                {ride.On}
              </div>
              <div className="col col-3">{ride.StartingPoint}</div>
              <div className="col col-3">{ride.Via}</div>
              <div className="col col-3">{ride.EndingPoint}</div>
              <div className="col col-3">
                {ride.DriverUName}, {ride.DriverPhone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </center>
  );
}
