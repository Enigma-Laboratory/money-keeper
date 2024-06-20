import { InputProps } from 'antd';
import { ReactElement } from 'react';
import { BaseSearchStyled } from './BaseSearch.styles';

interface BaseSearchProps extends InputProps {}
export const BaseSearch = (props: BaseSearchProps): ReactElement => {
  const { children, ...rest } = props;

  return <BaseSearchStyled {...rest}>{children}</BaseSearchStyled>;
};
