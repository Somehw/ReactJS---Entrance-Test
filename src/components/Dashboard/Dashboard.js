import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import Illtration from "./statics/Illustration.svg";
import LogoutIcon from "./statics/logout.svg";
import classes from "./Dashboard.module.css";
import UserImg from "./statics/Image.png";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["demo"]);

  const [dropdown, setDropdown] = useState(false);

  const handleOnFocus = () => {
    setDropdown(true);
  };

  const handleOnBlur = () => {
    setDropdown(false);
  };

  const handleOnLogout = () => {
    const url = "http://streaming.nexlesoft.com:4000/api/auth/logout";
    const requestOptions = {
      method: "POST",
      headers: { token: cookie.token },
    };
    fetch(url, requestOptions).then((response) => {});

    removeCookie("token", { path: "/" });
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.horizontal_navbar}>
        <div className={classes.navbar}>
          <div
            className={classes.right_text}
            onMouseEnter={handleOnFocus}
            onMouseLeave={handleOnBlur}
          >
            <div className={classes.info}>
              <div className={classes.text}>
                <div className={classes.name}>John Doe</div>
                <div className={classes.status}>Available</div>
              </div>
              <div className={classes.avatar_bg}>
                <img className={classes.avatar} src={UserImg} alt="UserImg" />
              </div>
            </div>
            <div
              style={{
                display: dropdown ? "flex" : "none",
              }}
              className={classes.dropdownContainer}
            >
              <div
                className={classes.dropdownItemContainer}
                onClick={handleOnLogout}
              >
                <span className={classes.dropdownItemText}>Logout</span>
                <img src={LogoutIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.body_bg}>
        <div className={classes.welcome_text}>Welcome to Demo App</div>
        <div className={classes.illutration}>
          <img
            className={classes.illtration_img}
            src={Illtration}
            alt="Illtration"
          />
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.copyright}>COPYRIGHT © 2020</div>
      </div>
    </div>
  );
};

export default Dashboard;
