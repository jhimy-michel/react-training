import React, { useEffect } from "react";

function Cockpit(props) {
  useEffect(() => {
    console.log("COCKPIT USEEFFECT");
    // http request
  }, []);
  const classes = [];
  if (props.persons.length <= 2) {
    classes.push("red"); // red class
  }
  if (props.persons.length <= 1) {
    classes.push("bold");
  }
  return (
    <>
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button alt={props.showPersons} onClick={props.change}>
        Toggle Persons
      </button>
    </>
  );
}

export default Cockpit;
