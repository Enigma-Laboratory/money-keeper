import { Button, Card, Image, Typography } from 'antd';
import { Logo } from 'assets/icons';
import styled, { css } from 'styled-components';
import { tablet } from 'styles';
import { laptop } from 'styles/media-queries';

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
    margin: 0;
    font-weight: bold;
    ${laptop(css`
      font-size: 32px;
    `)}
    ${tablet(css`
      font-size: 20px;
    `)};
  }
`;

export const StyledCard = styled(Card)`
  && {
    width: 400px;
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

export const LanguageWrap = styled.div`
  display: inline-flex;
  align-items: 'center';
  color: ${(props) => props.theme.colorBgTextActive};
  ${tablet(css`
    display: none;
  `)};
`;

export const StyledLogo = styled(Logo)`
  height: 64px;
  width: 64px;
  ${laptop(css`
    height: 48px;
    width: 48px;
  `)}
`;
