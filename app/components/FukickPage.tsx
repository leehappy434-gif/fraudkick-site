"use client";

import React, { useState, useRef } from "react";
import "./FukickPage.css";

const FukickPage: React.FC = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ color: "#fb7185" }}>🎯 伏Kick 測試成功！</h1>
      <p>香港首個消費消息資料庫</p>
      <p>如果看到這個訊息，表示組件已正確加載。</p>
    </div>
  );
};

export default FukickPage;
