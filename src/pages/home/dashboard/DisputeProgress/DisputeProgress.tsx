import React from 'react';
import { DisputeProgressStyled } from './DisputeProgress.styles';
import { Space, Image } from 'antd';
import { AreaChart, BaseButton } from 'components';

import { EllipsisOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

export const DisputeProgress = () => {
  return (
    <DisputeProgressStyled
      bordered={false}
      style={{
        width: 300,
        borderRadius: '20',
      }}
    >
      <div className="header">
        <div className="group">
          <p className="title">Dispute Progress </p>
          <p className="description">30 dispute in this mounth</p>
        </div>
        <div className="circle">
          <EllipsisOutlined />
        </div>
      </div>
      <div className="chart">
        <AreaChart />
      </div>
      <div className="actions">
        <div className="generated">
          <div className="circle">
            <UserOutlined className="icon" />
          </div>
          <p className="title">Generated</p>
          <p>200 accounts</p>
        </div>

        <div className="removed">
          <div className="circle">
            <DeleteOutlined className="icon" />
          </div>
          <p className="title">Removed</p>
          <p>12 accounts</p>
        </div>
      </div>
    </DisputeProgressStyled>
  );
};
