import React from "react";
import "../styles/App.css"
import { useState, useEffect } from "react";
import Web3 from "web3";
import { CarLoader } from "./Loader";

export function Connection() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState("");
  
    useEffect(() => {
      if (window.ethereum) {
        ethereum.request({ method: "eth_accounts" }).then((accounts)=>{
          if (accounts.length > 0) {
            const account = accounts[0];
            setAccount(account);
            setIsConnected(true);
          }
        })
      }
    }, []);
  
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
  