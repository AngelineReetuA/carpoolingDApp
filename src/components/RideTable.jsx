import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CarLoader } from "./Loader";

export function RideTable() {
  const loc = window.location.href;
  const parts = loc.split("/");
  const metamaskAddress = parts[parts.length - 2];

  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState();
  useEffect(() => {
    async function fetchRides() {
      try {
        const response = await fetch("http://localhost:4000/get-rides");
        if (response.ok) {
          const ridesData = await response.json();
          ridesData.sort(
            (a, b) => new Date(a.StartingTime) - new Date(b.StartingTime)
          );
          setRides(ridesData);
        } else {
          console.error("Failed to fetch rides:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    }

    fetchRides();
  }, []);

  async function join(ID, metamaskAddress) {
    console.log("ID:", ID);
    const resp = await fetch("http://localhost:4000/update-ride-details", {
      method: "POST",
      body: JSON.stringify({ ID, metamaskAddress }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (resp.ok) {
      swal(
        "Ride successfully joined",
        "Head on to the My Rides page to view your rides",
        "success"
      );
    } else {
      swal("Error", "Internal server error", "error");
    }
  }

  return (
    <center>
      <div className="container">
        <h2 className="rideTableHeading">
          Upcoming Rides for you to Tag Along
        </h2>
        {loading ? (
          <div>
            <CarLoader />
          </div>
        ) : (
          <ul className="responsive-table" id="table">
            <li className="table-header">
              <div className="col col-3">Ride Id</div>
              <div className="col col-3">Date</div>
              <div className="col col-3">Time</div>
              <div className="col col-3">Starting Area</div>
              <div className="col col-3">Via</div>
              <div className="col col-3">Destination</div>
              <div className="col col-3">Carpoolers pending</div>
              <div className="col col-3">Contact</div>
              <div className="col col-3">Join</div>
            </li>
            {rides?.map((ride) => (
              <li className="table-row" key={ride.ID}>
                <div className="col col-3">{ride.ID}</div>
                <div className="col col-3">{ride.On}</div>
                <div className="col col-3">{ride.StartingTime}</div>
                <div className="col col-3">{ride.StartingPoint}</div>
                <div className="col col-3">{ride.Via}</div>
                <div className="col col-3">{ride.EndingPoint}</div>
                <div className="col col-3">{ride.Carpoolers}</div>
                <div className="col col-3">
                  {ride.DriverUName}, {ride.DriverPhone}
                </div>
                <div className="col col-3">
                  <button
                    className="button"
                    onClick={() => join(ride.ID, metamaskAddress)}
                  >
                    Join
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </center>
  );
}
