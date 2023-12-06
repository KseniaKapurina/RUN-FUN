import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CustomContext } from "./../Context";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import ChangeData from "../components/changeData/ChangeData";
import "./../style/style.scss";

const AccountPage = () => {
  const location = useLocation();
  const { user } = useContext(CustomContext);

  if (location.pathname === "/login") {
    return <Login />;
  }
  if (location.pathname === "/account") {
    return (
      <section className="accountPage">
        <div className="container">
          <div className="wrapper">
            <div className="additional">
              <button>История заказов</button>
              <button>Личный кабинет</button>
            </div>
            <div className="dataUser">
              <ChangeData />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Register />;
  }
};

export default AccountPage;
