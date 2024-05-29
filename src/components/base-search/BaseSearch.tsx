import React, { ReactElement } from 'react';
import { BaseSearchStyled } from './BaseSearch.styles';
import { InputProps } from 'antd';

interface BaseSearchProps extends InputProps {}
export const BaseSearch = (props: BaseSearchProps): ReactElement => {
  const { children, ...rest } = props;

  return <BaseSearchStyled {...rest}>{children}</BaseSearchStyled>;
};
