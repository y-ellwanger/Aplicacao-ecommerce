import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navBar";

const Layout = ()=>{
  return(
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout