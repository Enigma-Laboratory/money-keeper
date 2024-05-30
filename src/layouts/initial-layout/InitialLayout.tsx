import { DownOutlined } from '@ant-design/icons';
import { Popover, theme } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Logo } from 'assets/icons/logo';
import { USAFlagIcon } from 'assets/icons/usa-flag';
import { VietnamFlagIcon } from 'assets/icons/vietnam-flag';
import background1 from 'assets/images/background-1.webp';
import background2 from 'assets/images/background-2.webp';
import { appConfig } from 'config';
import { Languages, useConfigProvider } from 'contexts';
import { useKeyboardShortcut } from 'hooks/useKeyboardShortcut';

import StyledLayout from './InitialLayout.Layout.styles';
import { LanguageButton, StyledCard, StyledImage, StyledTypography } from './InitialLayout.styles';
interface InitialLayoutProps {
  children: ReactNode;
}

export const InitialLayout = ({ children }: InitialLayoutProps) => {
  const { t } = useTranslation('auth');
  const { pathname } = useLocation();
  const { mode, setLocate } = useConfigProvider();
  const { language, theme: themeKeyboard } = useKeyboardShortcut();
  const { token } = theme.useToken();
  console.log(token);
  themeKeyboard({ character: '\\' });
  language();
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
    <StyledLayout $pathname={pathname}>
      <StyledLayout.Sider width={`${196 / 7}%`}>
        <StyledImage src={background2} preview={false} width={'100%'} />
      </StyledLayout.Sider>

      <StyledLayout.Content>
        <StyledLayout.Header>
          <div style={{ display: 'inline-flex' }}>
            <Logo size={64} theme={mode} />
            <StyledTypography.AppTitle>{appConfig.appTitle}</StyledTypography.AppTitle>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', color: token.colorBgTextActive }}>
            <Popover content={content} trigger="hover">
              <StyledTypography.LanguageTitle>
                <StyledTypography.LanguageTitleText>
                  {t('initialLayout.languageSite')}: {t('initialLayout.lang')}
                </StyledTypography.LanguageTitleText>
                <DownOutlined style={{ fontSize: '14px' }} />
              </StyledTypography.LanguageTitle>
            </Popover>
          </div>
        </StyledLayout.Header>
        <StyledCard title={CardTitle}>{children}</StyledCard>
      </StyledLayout.Content>

      <StyledLayout.Sider width={`${196 / 7}%`}>
        <StyledImage src={background1} preview={false} width={'100%'} />
      </StyledLayout.Sider>
    </StyledLayout>
  );
};
