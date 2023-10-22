import React from "react";
import GoodInBasket from "../components/goodInBasket/GoodInBasket";

import "./../style/style.scss";

const OrderPage = () => {
  return (
    <>

      <div className="container">
        <GoodInBasket />
      </div>
    </>
  );
};

export default OrderPage;
