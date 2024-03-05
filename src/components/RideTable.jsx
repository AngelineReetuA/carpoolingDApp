import React from "react";

export function RideTable() {
  return (
    <div className="container">
      <h2 className="rideTableHeading">Upcoming Rides for you to Tag Along</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-3">Ride Id</div>
          <div className="col col-3">Time & Date</div>
          <div className="col col-3">Starting Area</div>
          <div className="col col-3">Via</div>
          <div className="col col-3">Destination</div>
          <div className="col col-3">Carpoolers pending</div>
          <div className="col col-3">Contact</div>
          <div className="col col-3">Join</div>
        </li>
        <li className="table-row">
          <div className="col col-3">
            42235
          </div>
          <div className="col col-3">
            12:30 PM 29/01/24
          </div>
          <div className="col col-3">
            Nehru St, Velacherry
          </div>
          <div className="col col-3">
            Anna Salai
          </div>
          <div className="col col-3">
            Chintadripet MRTS
          </div>
          <div className="col col-3">
            3
          </div>
          <div className="col col-3">
            Abijith, 9080076521
          </div>
          <div className="col col-3">
            <button className="button">Join</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
