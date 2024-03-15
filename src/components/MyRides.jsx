import React from "react";

export function MyRides() {
  return (
    <center>
      <div className="container">
        <h2 className="rideTableHeading">
          Rides you have joined
        </h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-3">Time & Date</div>
            <div className="col col-3">Starting Area</div>
            <div className="col col-3">Via</div>
            <div className="col col-3">Destination</div>
            <div className="col col-3">Contact</div>
          </li>
          <li className="table-row">
            <div className="col col-3">12:30 PM 29/01/24</div>
            <div className="col col-3">Nehru St, Velacherry</div>
            <div className="col col-3">Anna Salai</div>
            <div className="col col-3">Chintadripet MRTS</div>
            <div className="col col-3">Abijith, 9080076521</div>
          </li>
        </ul>
      </div>
    </center>
  );
}
