import React from "react";

import classes from "./Login.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.xState === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.hfor}>{props.tekst}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.zmien}
        onBlur={props.wys}
      />
    </div>
  );
};

export default Input;
