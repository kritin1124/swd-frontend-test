"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import './page.css'; 

export default function Home() {
  const { t } = useTranslation(); 

  return (
    <div className="container">
      <div className="box">
        <h2>{t("test1")}</h2>
        <p>{t("title1")}</p>
      </div>
      <div className="box">
        <h2>{t("test2")}</h2>
        <p>{t("title2")}</p>
      </div>
      <div className="box">
        <h2>{t("test3")}</h2>
        <p>{t("title3")}</p>
      </div>
    </div>
  );
}