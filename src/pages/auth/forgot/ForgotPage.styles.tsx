import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colorBgTextActive};
  :hover {
    color: ${(props) => props.theme.colorBgTextHover};
  }
`;
