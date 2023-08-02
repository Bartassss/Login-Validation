import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "./input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isVlaid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isVlaid: state.value.includes("@") };
  }

  return { value: "", isVlaid: false };
};

const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isVlaid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isVlaid: state.value.trim().length > 6 };
  }

  return { value: "", isVlaid: false };
};

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isVlaid: null,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isVlaid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.isVlaid && passState.isVlaid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.isVlaid && passState.isVlaid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState, passState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/*  <div
          className={`${classes.control} ${
            emailState.isVlaid === false ? classes.invalid : ""
          }`}
        > */}

        <Input
          xState={emailState.isVlaid}
          hfor="email"
          type="email"
          id="email"
          value={emailState.value}
          zmien={emailChangeHandler}
          wys={validateEmailHandler}
          tekst="E-mail"
        />

        <Input
          xState={passState.isVlaid}
          hfor="password"
          type="password"
          id="password"
          value={passState.value}
          zmien={passwordChangeHandler}
          wys={validatePasswordHandler}
          tekst="Password"
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
