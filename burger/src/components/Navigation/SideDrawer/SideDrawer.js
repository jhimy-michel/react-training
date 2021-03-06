import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  let classes = ["SideDrawer", "Close"];
  if (props.open) {
    classes = ["SideDrawer", "Open"];
  }
  // ..
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={classes.join(" ")} onClick={props.closed}>
        <div className="SideLogo">
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
