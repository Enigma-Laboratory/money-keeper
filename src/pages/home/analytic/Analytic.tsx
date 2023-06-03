import React from "react";
import { AnalyticStyled } from "./Analytic.styles";
import { AreaChart, BaseButton } from "components";
import { Image } from "antd";

export const Analytic = () => {
  return (
    <AnalyticStyled>
      <h2 style={{ fontWeight: "bold", margin: 0 }}>$ 12379237</h2>
      <p style={{ margin: 0 }}>Thursday,10 December 2023 </p>

      <p>Today</p>

      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require("assets/images/credit.webp")}
          style={{ borderRadius: "50%" }}
        />
        <div className="content">
          <p className="title">Hunter macbook</p>
          <p className="des">92329637806781262183 </p>
        </div>
      </div>
      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require("assets/images/credit.webp")}
          style={{ borderRadius: "50%" }}
        />
        <div className="content">
          <p className="title">Hunter macbook</p>
          <p className="des">92329637806781262183 </p>
        </div>
      </div>
      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require("assets/images/credit.webp")}
          style={{ borderRadius: "50%" }}
        />
        <div className="content">
          <p className="title">Hunter macbook</p>
          <p className="des">92329637806781262183 </p>
        </div>
      </div>
      <BaseButton className="btn-view-more">View More</BaseButton>

      <h2 style={{ fontWeight: "bold", margin: 0, marginTop: 30 }}>
        Loan caculator
      </h2>
      <p style={{ margin: 0 }}>Select the about needed </p>
    </AnalyticStyled>
  );
};
