import { Button, Card, Image, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { tablet } from 'styles';

const StyledTypographyCardTitle = styled(Typography.Title)`
  && {
    margin: 0;
    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
    overflow-wrap: break-word;
    hyphens: manual;
    text-overflow: unset;
    white-space: pre-wrap;
    color: ${(props) => props.theme.colorPrimaryTextHover};
  }
`;

const StyledTypographyLanguageTitleText = styled.div`
  && {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: inherit;
    margin-right: 6px;
    display: inline-block;
    color: inherit;
  }
`;

const StyledTypographyLanguageTitle = styled(Typography.Title)`
  && {
    display: inline-flex;
    color: #d3d3d3;
    :hover {
      cursor: pointer;
      color: #c6c6c6;
    }
  }
`;

const StyledTypographyAppTitle = styled(Typography.Title)`
  && {
    line-height: 64px;
    margin: 0;
    font-weight: bold;
    ${tablet(css`
      font-size: 20px;
    `)};
  }
`;

export const StyledCard = styled(Card)`
  && {
    width: 500px;
    border: none;
    > div {
      border: none;
    }
  }
`;

export const StyledTypography = {
  CardTitle: StyledTypographyCardTitle,
  LanguageTitle: StyledTypographyLanguageTitle,
  LanguageTitleText: StyledTypographyLanguageTitleText,
  AppTitle: StyledTypographyAppTitle,
};

export const StyledImage = styled(Image)`
  && {
    background-color: red;
    object-fit: cover;
    height: 100vh;
  }
`;

export const LanguageButton = styled(Button)`
  display: flex;
  width: 100%;
  padding: 8px;
  height: unset;
`;
