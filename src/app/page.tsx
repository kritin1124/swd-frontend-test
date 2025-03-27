"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "antd";
import './page.css'; 
import { useRouter } from "next/navigation";

export default function Home() {
  const { t } = useTranslation(); 
  const router = useRouter();

  return (
    <div className="container">
      <Row gutter={16} justify="center">
        <Col span={8} style={{ cursor: "pointer" }} onClick={() => router.push("/shape")}>
          <Card
            title={t("layout.test1")}
            style={{ width: 300 }}
          >
            <p>{t("layout.title1")}</p>
          </Card>
        </Col>
        <Col span={8} style={{ cursor: "pointer" }} onClick={() => alert("ไม่ได้สอบอันนี้")}>
          <Card
            title={t("layout.test2")}
            style={{ width: 300 }}
          >
            <p>{t("layout.title2")}</p>
          </Card>
        </Col>
        <Col span={8} style={{ cursor: "pointer" }} onClick={() => router.push("/crud")}>
          <Card
            title={t("layout.test3")}
            style={{ width: 300 }}
          >
            <p>{t("layout.title3")}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
