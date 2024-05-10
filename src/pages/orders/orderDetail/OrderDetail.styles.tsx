import { Typography } from 'antd';
import styled from 'styled-components';

export const DetailOrderStyled = styled.div`
  .ant-card-head-title {
    .ant-space {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const StyledTypography = styled(Typography.Text)`
  background-color: #c9c3c3;
  border: 1px solid #cccaca;
  padding: 3px 10px 1px 10px;
  border-radius: 5px;
  color: white;
`;
