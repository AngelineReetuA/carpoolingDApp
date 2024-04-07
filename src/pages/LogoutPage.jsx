import React from "react";
import { Header } from "../components/Header";

export function LogoutPage() {
  return (
    <>
      <Header />
      <center>
        <h3>Logged out</h3>
        <h4>Please ensure to close tab to disable metamask..</h4>
      </center>
    </>
  );
}
