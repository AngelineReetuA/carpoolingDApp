import React, { useState } from "react";
import "../styles/Forms.css";

export function Registration() {
  const [success, setSuccess] = useState(false);

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
    } catch (error) {}

    // const doc = {
    //   username: uname,
    //   name: name,
    //   address: address,
    //   phoneNo: phoneNo,
    //   bloodGroup: bg,
    //   emergencyContact: emergency,
    //   licenceID: dlID,
    //   licenceHash: dlHash?.filePath,
    // };

    try {
      const resp = await fetch("http://localhost:4000/addToHF", {
        method: "POST",
        body: formData,
      });

      console.log("HF DONE");
      console.log(dlHash);
      setSuccess(true);
    } catch (error) {}
  }

  return (
    <>
      {success && (
        <div className="alert-box">
          <span className="close-btn" onClick={() => setSuccess(false)}>
            &times;
          </span>
          <p>Registered Successfully!</p>
        </div>
      )}
      <form onSubmit={register}>
        <h3>First time user? Please register here</h3>
        <div className="form">
          <label>Username</label>
          <br />
          <input type="text" name="uName" placeholder="Your app username.." />
          <br />
          <label>Name</label>
          <br />
          <input type="text" name="name" placeholder="Your name.." />
          <br />
          <label>Address</label>
          <br />
          <input
            type="text"
            name="address"
            placeholder="Your current address.."
          />
          <br />
          <label>Phone Number</label>
          <br />
          <input type="text" name="phno" placeholder="Your phone number.." />
          <br />
          <label>Blood Group</label>
          <br />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Your blood group.."
          />
          <br />
          <label>Emergency Contact</label>
          <br />
          <input
            type="text"
            name="emerCon"
            placeholder="Your emergency contact number.."
          />
          <br />
          <label>Driver's License ID</label>
          <br />
          <input type="text" name="dlno" placeholder="Your DL Number.." />
          <br />
          <label>Driver's License</label>
          <br />
          <input type="file" accept=".png" name="dl" />
          <br />
          <input type="submit" value="Register" />
        </div>
      </form>
    </>
  );
}
