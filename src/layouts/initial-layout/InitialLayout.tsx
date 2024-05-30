import { DownOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { USAFlagIcon, VietnamFlagIcon } from 'assets/icons';
import backgroundLogin from 'assets/images/background-login.webp';
import backgroundWithoutLogin from 'assets/images/background-without-login.webp';

import { appConfig } from 'config';
import { Languages, useConfigProvider } from 'contexts';
import { useKeyboardShortcut } from 'hooks';

import StyledLayout from './InitialLayout.Layout.styles';
import {
  LanguageButton,
  LanguageWrap,
  StyledCard,
  StyledImage,
  StyledLogo,
  StyledTypography,
} from './InitialLayout.styles';

export const InitialLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { t } = useTranslation('auth');
  const { pathname } = useLocation();
  const { mode, setLocate } = useConfigProvider();
  const { toggleTheme } = useKeyboardShortcut();

  toggleTheme();
  const GOLDEN_RATIO: number = 196 / 7;

  const CardTitle = (
    <StyledTypography.CardTitle level={3}>{t(`${pathname.substring(1)}.title`)}</StyledTypography.CardTitle>
  );
  const changeLanguage = (langType: Languages) => {
    setLocate(langType);
  };

  const content = (
    <div>
      <LanguageButton type="text" onClick={() => changeLanguage(Languages.VI)}>
        <VietnamFlagIcon style={{ height: '22px', width: '30px', marginRight: '6px' }} />
        Tiếng Việt
      </LanguageButton>
      <LanguageButton type="text" onClick={() => changeLanguage(Languages.EN)}>
        <USAFlagIcon style={{ height: '22px', width: '30px', marginRight: '6px' }} />
        English
      </LanguageButton>
    </div>
  );

  return (
    <StyledLayout $pathname={pathname} $goldenRatio={GOLDEN_RATIO}>
      <StyledLayout.Sider width={`${GOLDEN_RATIO}%`}>
        <StyledImage src={backgroundWithoutLogin} preview={false} width={'100%'} />
      </StyledLayout.Sider>

      <StyledLayout.Content>
        <StyledLayout.Header>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <StyledLogo size={64} theme2={mode} />
            <StyledTypography.AppTitle>{appConfig.appTitle}</StyledTypography.AppTitle>
          </div>

          <LanguageWrap>
            <Popover content={content} trigger="hover">
              <StyledTypography.LanguageTitle>
                <StyledTypography.LanguageTitleText>
                  {t('initialLayout.languageSite')}: {t('initialLayout.lang')}
                </StyledTypography.LanguageTitleText>
                <DownOutlined style={{ fontSize: '14px' }} />
              </StyledTypography.LanguageTitle>
            </Popover>
          </LanguageWrap>
        </StyledLayout.Header>
        <StyledCard title={CardTitle}>{children}</StyledCard>
      </StyledLayout.Content>

      <StyledLayout.Sider width={`${GOLDEN_RATIO}%`}>
        <StyledImage src={backgroundLogin} preview={false} width={'100%'} />
      </StyledLayout.Sider>
    </StyledLayout>
  );
};
