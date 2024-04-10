import React, { useState } from "react";
import "../styles/Forms.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

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
        swal("Success","You are regsitered successfully","success")
        navigate(`/profile/${mmID}/ride-page`);
      } else {
        swal("Error","We have encountered an error","error")
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
                    pattern="[^\s]+"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input type="text" name="name" placeholder="Your name.." pattern="[A-Za-z ]{1,}" required/>
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
                    pattern="[A-Za-z ]{1,}"
                    required
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
                    pattern="[0-9]{10}"
                    required
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
                    required
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
                    pattern="[0-9]{10}"
                    required
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
                    placeholder="Your DL Number (AA-12-1234-1234567)"
                    pattern="[A-Z]{2}-\d{2}-\d{4}-\d{7}"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Driver's License</label>
                </td>
                <td>
                  <input type="file" accept=".png" name="dl" required/>
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
