import React from "react";

export function RideTable() {
  return (
    <div className="container">
      <h2 className="rideTableHeading">Upcoming Rides for you to Tag Along</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Ride Id</div>
          <div className="col col-2">Starting from</div>
          <div className="col col-3">Via</div>
          <div className="col col-3">Destination</div>
          <div className="col col-2">Carpoolers pending</div>
          <div className="col col-3">Contact</div>
          <div className="col col-1">Join</div>
        </li>
        <li className="table-row">
          <div className="col col-1">
            42235
          </div>
          <div className="col col-2">
            Nehru St, Velacherry
          </div>
          <div className="col col-3">
            Anna Salai
          </div>
          <div className="col col-3">
            Chintadripet MRTS
          </div>
          <div className="col col-2">
            3
          </div>
          <div className="col col-3">
            Abijith, 9080076521
          </div>
          <div className="col col-1">
            <button className="button">Join</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
