import React from "react";

import { useTranslation } from "react-i18next";
import OneGood from "../components/oneGood/OneGood";
import IMAGES from "../assets/img";

const OneGoodPage = ({ list }) => {
  const { t } = useTranslation();
  return (
    <>
      <OneGood list={list} />
    </>
  );
};

export default OneGoodPage;
