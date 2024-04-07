import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import Web3 from "web3";
import { CarLoader } from "./Loader";

export function MyRides() {
  const [exists, setExists] = useState();
  const [loading, setLoading] = useState(true);
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
            let unames = ride.RidersUnames;
            const riderUnamesArray = unames.split(";");
            console.log("usernames array", riderUnamesArray);
            for (const uname of riderUnamesArray) {
              console.log(
                "checking uname",
                uname,
                "with metamask",
                metamaskAddress
              );
              if (uname === metamaskAddress) {
                console.log("true");
                setRides([...rides, ride]);
                if (rides===null) {
                  setExists(false);
                } else {
                  setExists(true);
                }
                setLoading(false);
              }
            }
          }
          setLoading(false);
        } else {
          console.error("Failed to fetch rides:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    }

    fetchRides();
  }, []);
  async function done(metamaskOwner) {
    const obj = {
      reciever: metamaskOwner,
      owner: metamaskAddress,
    };

    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);

      // Prompt user to connect Metamask
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async function (accounts) {
          const fromAddress = accounts[0]; // Get the current Metamask account
          const contractAddress = "0xd1360f6b69ac0a20e48c08f97b97eba984868d2e"; // Replace with your contract address

          try {
            // Fetch contract ABI from URL
            const response = await fetch("http://localhost:4000/get-contract");
            if (!response.ok) {
              throw new Error("Failed to fetch contract ABI");
            }
            const contractABI = await response.json();
            console.log("contractABI:", contractABI);

            // Create contract instance
            const contract = new web3.eth.Contract(
              contractABI,
              contractAddress
            );

            const toAddress = "0x6f0E710B76f00dA026Fa720cf2E8863B144d487a"; // Replace with the receiver's address
            const amount = "100000000000000000000"; // Replace with the amount of tokens to transfer

            try {
              // Send transaction to transfer tokens
              const result = await contract.methods
                .transfer(toAddress, amount)
                .send({ from: fromAddress });
              console.log("Transaction successful:", result);
              swal(
                "Tokens earned!",
                "Your tokens will reach your wallet shortly",
                "success"
              );
            } catch (error) {
              console.error("Error transferring tokens:", error);
              swal("Error in transfer", "There has been a problem", "error");
            }
          } catch (error) {
            console.error("Error fetching contract ABI:", error);
            swal("Error in contractABI", "There has been a problem", "error");
          }
        })
        .catch(function (error) {
          // Handle case where user denies access to Metamask
          console.error("User denied access to Metamask:", error);
          swal("Error in Metamask", "There has been a problem", "error");
        });
    } else {
      // Handle case where Metamask is not installed
      console.error(
        "Metamask not found. Please install Metamask to use this feature."
      );
      alert("Metamask not found. Please install Metamask to use this feature.");
    }
  }
  return (
    <center>
      {exists ? (
        loading ? (
          <CarLoader />
        ) : (
          <div className="container">
            <h2 className="rideTableHeading">Rides you have joined</h2>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-3">Date</div>
                <div className="col col-2">Time</div>
                <div className="col col-2">Starting Area</div>
                <div className="col col-3">Via</div>
                <div className="col col-3">Destination</div>
                <div className="col col-3">Contact</div>
                <div className="col col-3"></div>
              </li>
              {rides?.map((ride) => (
                <li className="table-row" key={ride.ID}>
                  <div className="col col-3">{ride.On}</div>
                  <div className="col col-2">{ride.StartingTime}</div>
                  <div className="col col-2">{ride.StartingPoint}</div>
                  <div className="col col-3">{ride.Via}</div>
                  <div className="col col-3">{ride.EndingPoint}</div>
                  <div className="col col-3">
                    {ride.DriverUName}, {ride.DriverPhone}
                  </div>
                  <div className="col col-3">
                    <button
                      className="button"
                      onClick={() => done(ride.DriverID)}
                    >
                      Send Tokens
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <h4 className="rideTableHeading">You have not joined any rides yet</h4>
      )}
    </center>
  );
}
