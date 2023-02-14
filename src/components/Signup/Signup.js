import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import FacebookIcon from "./statics/Facebook.svg";
import TwitterIcon from "./statics/Twitter.svg";
import MailIcon from "./statics/Mail.svg";
import GitIcon from "./statics/Git.svg";
import { FormProvider } from "../UI/Input";
import { FormComponent } from "./form";
import { useCookies } from "react-cookie";

const Signup = (props) => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["demo"]);

  const url = "http://streaming.nexlesoft.com:4000/api/auth/signup";
  const handleOnSubmit = (value = []) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: value[0].value,
        lastName: value[1].value,
        email: value[2].value,
        password: value[3].value,
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
    navigate("/login");
  };

  return (
    <div className={classes.signup}>
      <div className={classes.illutrations}>
        <div className={classes.body_bg}>
          <div className={classes.group}></div>
        </div>
      </div>
      <div className={classes.signup_form}>
        <div className={classes.group_95}>
          <div className={classes.text}>
            <span className={classes.textHeading}>Adventure starts here</span>
            <span className={classes.textBody}>
              Make your app management easy and fun!
            </span>
          </div>
          <FormProvider
            initialValues={[
              {
                name: "firstName",
                isValid: false,
                value: "",
              },
              {
                name: "lastName",
                isValid: false,
                value: "",
              },
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
              {
                name: "checkbox",
                isValid: false,
                value: false,
              },
            ]}
          >
            <FormComponent onSubmit={handleOnSubmit} />
          </FormProvider>
          <div className={classes.loginContainer}>
            <span className={classes.loginText}>Already have an account?</span>
            <a className={classes.loginHref} onClick={handleHref}>
              Sign in instead
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

export default Signup;
