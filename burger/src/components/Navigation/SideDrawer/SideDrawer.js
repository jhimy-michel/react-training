import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  // ..
  return (
    <>
      <Backdrop show />
      <div className="SideDrawer">
        <div className="SideLogo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
