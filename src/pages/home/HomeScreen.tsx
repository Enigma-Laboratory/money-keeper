import React, { ReactElement } from 'react';
import { HomeScreenStyled } from './HomeScreen.styles';
import { Dashboard } from './dashboard';
import { Analytic } from './analytic';
export const HomeScreenDesktop = (): ReactElement => {
  return (
    <HomeScreenStyled>
      <Dashboard />
      <Analytic />
    </HomeScreenStyled>
  );
};
