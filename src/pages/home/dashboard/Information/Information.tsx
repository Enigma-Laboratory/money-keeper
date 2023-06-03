import React from "react";
import { InformationStyled } from "./Information.styles";
import { Space, Image } from "antd";
import { BaseButton } from "components";

export const Information = () => {
  return (
    <InformationStyled
      bordered={false}
      style={{
        width: 300,
        backgroundColor: "#cee8fd",
        borderRadius: "20",
      }}
    >
      <Space
        size={50}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          width={100}
          height={100}
          preview={false}
          src={require("assets/images/info.jpg")}
          style={{ borderRadius: "50%" }}
        />

        <BaseButton>View Analytics</BaseButton>
      </Space>
    </InformationStyled>
  );
};
