import { List } from 'antd';
import styled from 'styled-components';

export const StyledList = styled(List)``;

const StyledListItem = styled(List.Item)`
  && {
    cursor: pointer;
    height: 54px;
    padding: 16px;
    :hover {
      background-color: ${(props) => props.theme.colorBgTextHover};
    }
  }
`;

StyledList.Item = StyledListItem;
