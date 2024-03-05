import React, { useState } from "react";
import "../styles/Forms.css";
import { useNavigate } from "react-router-dom";

export function Registration() {
  const navigate = useNavigate();

  const loc = window.location.href;
  const mmID = loc.split("/profile/")[1];
  console.log(mmID);
  check()
  async function check (){
    try {
      const resp = await fetch("http://localhost:4000/checkUser", {
        method: "POST",
        body: mmID,
      });
      if (resp === true) {
        console.log("hi")
      }
    } catch {}
  }
  
  async function register(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const uname = formData.get("uName");
    const name = formData.get("name");
    const address = formData.get("address");
    const phoneNo = formData.get("phno");
    const bg = formData.get("bloodGroup");
    const emergency = formData.get("emerCon");
    const dlID = formData.get("dlno");
    const dlpng = formData.get("dl");
    let dlHash;
    console.log(dlpng);
    try {
      const resp = await fetch("http://localhost:4000/uploadfiles", {
        method: "POST",
        body: formData,
      });

      console.log("IPFS DONE");
      dlHash = await resp.json();
      console.log(dlHash);
      formData.append("dlHash", dlHash.filePath);
      formData.append("metamask", mmID);
    } catch (error) {}

    try {
      const resp = await fetch("http://localhost:4000/addToHF", {
        method: "POST",
        body: formData,
      });
      if (resp.ok) {
        alert("Registered successfully");
        navigate(`/profile/${mmID}/ride-page`);
      } else {
        alert("Registration failed");
      }
    } catch (error) {}
  }

  return (
    <>
      <form onSubmit={register}>
        <h4>First time user? Please register here</h4>
        <div className="form">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Username</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="uName"
                    placeholder="Your app username.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input type="text" name="name" placeholder="Your name.." />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Address</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your current address.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Phone Number</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="phno"
                    placeholder="Your phone number.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Blood Group</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="bloodGroup"
                    placeholder="Your blood group.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Emergency Contact</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="emerCon"
                    placeholder="Your emergency contact number.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Driver's License ID</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="dlno"
                    placeholder="Your DL Number.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Driver's License</label>
                </td>
                <td>
                  <input type="file" accept=".png" name="dl" />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Register" />
        </div>
      </form>
    </>
  );
}
