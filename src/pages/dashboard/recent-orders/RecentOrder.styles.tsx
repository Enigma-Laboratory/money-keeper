import { Table, Typography } from 'antd';
import styled from 'styled-components';
import { ColumnProps } from './RecentOrders';

export const StyledTable = styled(Table<ColumnProps>)<{ $bodyHeight: number }>`
  .ant-table-body {
    height: ${(props) => props.$bodyHeight}px;
  }
`;

export const StyledNameText = styled(Typography.Text)<{ $description?: string }>`
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-bottom: ${(props) => (props.$description?.length !== undefined ? 20 : 0)}px;
`;

export const StyledDescriptionText = styled(Typography.Text)`
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => props.theme.colorTextSecondary};
  display: block;
  position: absolute;
  right: 16px;
  left: 16px;
  top: 50%;
  transform: translateY(calc(-50% + 10px));
`;
