import React from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

import FacebookIcon from "../Signup/statics/Facebook.svg";
import TwitterIcon from "../Signup/statics/Twitter.svg";
import MailIcon from "../Signup/statics/Mail.svg";
import GitIcon from "../Signup/statics/Git.svg";

import { FormProvider } from "../UI/Input";
import { SigninFormComponent } from "./Form";
import { useCookies } from "react-cookie";

const Login = (props) => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["demo"]);
  const url = "http://streaming.nexlesoft.com:4000/api/auth/signin";
  const handleOnSubmit = (value = []) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: value[0].value,
        password: value[1].value,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.token) {
          setCookie("token", data?.token, { path: "/" });
          navigate("/dashboard");
        }
      });
  };

  const handleHref = (e) => {
    navigate("/signup");
  };

  return (
    <div className={classes.login}>
      <div className={classes.illutrations}>
        <div className={classes.body_bg}>
          <div className={classes.illutration}></div>
        </div>
      </div>
      <div className={classes.login_form}>
        <div className={classes.login_group}>
          <div className={classes.text}>
            <span className={classes.textHeading}>
              Welcome to Entrance Test Interview!
            </span>
            <span className={classes.textBody}>
              Please sign-in to your account and start the adventure
            </span>
          </div>
          <FormProvider
            initialValues={[
              {
                name: "email",
                isValid: false,
                value: "",
              },
              {
                name: "password",
                isValid: false,
                value: "",
              },
            ]}
          >
            <SigninFormComponent onSubmit={handleOnSubmit} />
          </FormProvider>
          <div className={classes.signupContainer}>
            <span className={classes.signupText}>New on our platform?</span>
            <a className={classes.signupHref} onClick={handleHref}>
              Create an account
            </a>
          </div>
          <div className={classes.footerContainer}>
            <div className={classes.hr}></div>
            <span className={classes.hrText}>or</span>
            <div className={classes.hr}></div>
          </div>
          <div className={classes.socialContainer}>
            <img
              className={classes.socialItem}
              src={FacebookIcon}
              alt="FacebookIcon"
            />
            <img
              className={classes.socialItem}
              src={TwitterIcon}
              alt="TwitterIcon"
            />
            <img className={classes.socialItem} src={MailIcon} alt="MailIcon" />
            <img className={classes.socialItem} src={GitIcon} alt="GitIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
