import { Card, Typography } from 'antd';
import styled from 'styled-components';

export const StyledOrderCard = styled(Card)`
  margin-bottom: 5px;
  .ant-card-body {
    padding: 10px 20px;
  }
`;
export const StyledName = styled(Typography.Text)<{ $me: boolean }>`
  font-weight: ${(props) => (props.$me ? 'bold' : 'normal')};
  color: ${(props) => (props.$me ? props.theme.colorPrimary : '')};
`;
