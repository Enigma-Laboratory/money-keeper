import React, { ReactElement } from 'react';
import { DashboardStyled } from './Dashboard.styles';
import { Select } from 'antd';
import { Information } from './Information';
import { DisputeProgress } from './DisputeProgress';
import { CreditReport } from './CreditRport';
import { CreditByCategory } from './CreditByCategory';

export const Dashboard = (): ReactElement => {
  return (
    <DashboardStyled>
      <div className="header">
        <h3>Dashboard</h3>
        <Select
          defaultValue={{ label: 'week' }}
          style={{ width: 120 }}
          options={[
            {
              label: 'week',
              value: 'week',
            },
          ]}
        />
      </div>
      <div className="cards">
        <Information />
        <DisputeProgress />
        <CreditReport />
        <CreditByCategory />
      </div>
    </DashboardStyled>
  );
};
