import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const NavigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavigationItem exact link={"/"}>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated && (
        <NavigationItem link={"/orders"}>Orders</NavigationItem>
      )}
      {!props.isAuthenticated ? (
        <NavigationItem link={"/auth"}>Authentication</NavigationItem>
      ) : (
        <NavigationItem link={"/logout"}>Log Out</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
