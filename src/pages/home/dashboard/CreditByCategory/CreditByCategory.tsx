import React from 'react';
import { CreditByCategoryStyled } from './CreditByCategory.styles';
import { Space, Image } from 'antd';
import { AreaChart, BaseButton } from 'components';

import { EllipsisOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

export const CreditByCategory = () => {
  return (
    <CreditByCategoryStyled
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

      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require('assets/images/info.jpg')}
          style={{ borderRadius: '50%' }}
        />
        <div className="content">
          <p className="title">Installment</p>
          <p className="des">Samantha william</p>
        </div>
        <div className="price">$ 240</div>
      </div>
      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require('assets/images/info.jpg')}
          style={{ borderRadius: '50%' }}
        />
        <div className="content">
          <p className="title">Installment</p>
          <p className="des">Samantha william</p>
        </div>
        <div className="price">$ 240</div>
      </div>
      <div className="card">
        <Image
          width={45}
          height={45}
          preview={false}
          src={require('assets/images/info.jpg')}
          style={{ borderRadius: '50%' }}
        />
        <div className="content">
          <p className="title">Installment</p>
          <p className="des">Samantha william</p>
        </div>
        <div className="price">$ 240</div>
      </div>
    </CreditByCategoryStyled>
  );
};
