import { Card, Image, Typography } from 'antd';
import styled from 'styled-components';

const StyledTypographyTitle = styled(Typography.Title)`
  && {
    text-align: center;
    margin: 0;
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    overflow-wrap: break-word;
    hyphens: manual;
    text-overflow: unset;
    white-space: pre-wrap;
    color: ${(props) => props.theme.colorPrimaryTextHover};
  }
`;

export const StyledCard = styled(Card)`
  && {
    width: 400;
    border: none;
    > div {
      border: none;
    }
  }
`;

export const StyledTypography = {
  Title: StyledTypographyTitle,
};

export const StyledImage = styled(Image)`
  && {
    object-fit: cover;
    height: 100vh;
  }
`;
