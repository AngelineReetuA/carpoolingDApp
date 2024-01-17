import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function Header() {
  return (
    <>
      <div className="header">
        TAG ALONG
        <br />
        <span className="subHeading">
          - A ride-share application to reduce pollution and gas usage -
        </span>
      </div>
    </>
  );
}

function CarLoader() {
  return (
    <div className="loader">
      <svg
        className="car"
        width="102"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="translate(2 1)"
          stroke="#002742"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="car__body"
            d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
            strokeWidth="3"
          />
          <ellipse
            className="car__wheel--left"
            strokeWidth="3.2"
            fill="#FFF"
            cx="83.493"
            cy="30.25"
            rx="6.922"
            ry="6.808"
          />
          <ellipse
            className="car__wheel--right"
            strokeWidth="3.2"
            fill="#FFF"
            cx="46.511"
            cy="30.25"
            rx="6.922"
            ry="6.808"
          />
          <path
            className="car__line car__line--top"
            d="M22.5 16.5H2.475"
            strokeWidth="3"
          />
          <path
            className="car__line car__line--middle"
            d="M20.5 23.5H.4755"
            strokeWidth="3"
          />
          <path
            className="car__line car__line--bottom"
            d="M25.5 9.5h-19"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  );
}

function Connection() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("No providers detected");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAcc = await web3.eth.getAccounts();
        const account = userAcc[0];
        setAccount(account);
        setIsConnected(true);
      }
    } catch (err) {
      console.log("Error" + err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <>
      <div>
        {!isConnected && (
          <div>
            <br />
            <br />
            <CarLoader />
            <center>
              <h2>Click to connect to the DApp via Metamask</h2>
              <button className="button" onClick={onConnect}>
                Login
              </button>
            </center>
          </div>
        )}
      </div>
      <div>
        {isConnected && (
          <>
            <center>
              <h2>You are connected to Tag Along via Metamask {account.slice(0,6)}...!</h2>
              <button className="button button2" onClick={onDisconnect}>
                Disconnect
              </button>
            </center>
            <br />
            <br />
            <RegisterUser />
          </>
        )}
      </div>
    </>
  );
}

function RegisterUser() {
  return (
    <>
      <h2>User Registration</h2>
      <h4>Username: </h4>
      <input type="text" placeholder="Enter username"></input>
      <h4>Phone Number: </h4>
      <input type="text" placeholder="Enter phone number"></input>
      <h3>Optional: </h3>
      <h4>Vehicle Number:</h4>
      <input type="text" placeholder="Enter vehicle number"></input>
      <h4>Vehicle Model Name: </h4>
      <input type="text" placeholder="Enter vehicle model name"></input>
      <br />
      <br />
      <br />
      <button className="button">Register</button>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Connection />
    </>
  );
}

export default App;
