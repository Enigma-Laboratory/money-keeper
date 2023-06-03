import React, { ReactNode } from "react";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Input, MenuProps, Popover, Space } from "antd";
import { Layout, Menu, theme } from "antd";
import { LayoutMainStyled } from "./LayoutMain.styles";
import { BaseSearch } from "components";

const { Header, Content, Sider } = Layout;

export interface LayoutMainProps {
  children: ReactNode;
}

export const LayoutMain = (props: LayoutMainProps) => {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    return {
      key: index,
      icon: React.createElement(icon),
    };
  });

  return (
    <LayoutMainStyled>
      <Header>
        <div className="logo">
          <p className="title">Money Keeper</p>
          <p className="created-by"> by VietNam Team</p>
        </div>

        <BaseSearch placeholder="Searching for everything" />
        <div className="container-notify">
          <Space size={24}>
            <Popover
              content={
                <div>
                  <div>
                    <p>Message ...</p>
                    <p>Message...</p>
                  </div>
                </div>
              }
              title="Title"
              trigger="click"
            >
              <Badge count={1} offset={[0, 5]}>
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<MessageOutlined />}
                  style={{ cursor: "pointer" }}
                />
              </Badge>
            </Popover>

            <Badge>
              <Avatar shape="circle" size="large" icon={<UserOutlined />} />
            </Badge>
            <div className="info">
              <Popover
                content={
                  <div>
                    <div>
                      <p>Le Tu Tuan</p>
                      <p>UIT</p>
                    </div>
                  </div>
                }
                title="Title"
                trigger="hover"
              >
                <p
                  style={{
                    width: "100px",
                    margin: 0,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Le Tu Tuan
                </p>
              </Popover>
              <p style={{ width: "100px", margin: 0 }}>admin</p>
            </div>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider width={80} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </LayoutMainStyled>
  );
};
