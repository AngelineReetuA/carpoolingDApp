import React from "react";
import { useState } from "react";
import { CarLoader } from "./Loader";

export function PostRide() {
  const [loading, setLoading] = useState();
  async function postRide(event) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    const loc = window.location.href;
    console.log(loc);
    const parts = loc.split("/");
    const metamaskAddress = parts[parts.length - 2];
    console.log("Metamask address:", metamaskAddress);

    formData.append("metamaskAddress", metamaskAddress);

    const date = Date.now();
    formData.append("rideID", `rideno${date}`);

    const resp = await fetch(
      "http://localhost:4000/get-user-details-and-post",
      {
        method: "POST",
        body: formData,
      }
    );
    if (resp.ok) {
      setLoading(false);
      console.log("RIDE COMITTED SUCCESSFULLY");
      swal("Ride posted!", "Sit back and wait for the taggers", "success");
    }
  }

  return (
    <>
      {loading ? (
        <CarLoader />
      ) : (
        <form onSubmit={postRide}>
          <h4>Post a new ride !!</h4>
          <div className="form">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Date</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      pattern="\d{2}-\d{2}-\d{4}"
                      placeholder="MM-DD-YYYY"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Start Time</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="startTime"
                      pattern="(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)"
                      placeholder="Please enter a valid time in the format HH:MM AM/PM"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Starting area</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="startArea"
                      placeholder="Starting area"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Via</label>
                  </td>
                  <td>
                    <input type="text" name="via" placeholder="Via" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Destination</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="dest"
                      placeholder="Destination"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Tag along - ers</label>
                  </td>
                  <td>
                    <input type="number" name="taggers" required />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Post" />
          </div>
        </form>
      )}
    </>
  );
}
