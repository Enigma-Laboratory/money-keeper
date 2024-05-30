import { Typography } from 'antd';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Logo } from 'assets/icons/logo';
import background1 from 'assets/images/background-1.webp';
import background2 from 'assets/images/background-2.webp';

import { appConfig } from 'config';
import { Mode, useConfigProvider } from 'contexts';
import StyledLayout from './InitialLayout.Layout.styles';
import { StyledCard, StyledImage, StyledTypography } from './InitialLayout.styles';

interface InitialLayoutProps {
  children: ReactNode;
}

export const InitialLayout = ({ children }: InitialLayoutProps) => {
  const { t } = useTranslation('auth');
  const { pathname } = useLocation();
  const { mode, setMode } = useConfigProvider();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '|') {
        setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT);
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [mode]);

  const CardTitle = <StyledTypography.Title level={3}>{t(`${pathname.substring(1)}.title`)}</StyledTypography.Title>;

  return (
    <StyledLayout $pathname={pathname}>
      <StyledLayout.Sider width={`${196 / 7}%`}>
        <StyledImage src={background2} preview={false} width={'100%'} />
      </StyledLayout.Sider>

      <StyledLayout.Content>
        <StyledLayout.Header>
          <Logo size={64} theme={mode} />
          <Typography.Title style={{ lineHeight: '64px', margin: 0 }}>{appConfig.appTitle}</Typography.Title>
        </StyledLayout.Header>
        <StyledCard title={CardTitle}>{children}</StyledCard>
      </StyledLayout.Content>

      <StyledLayout.Sider width={`${196 / 7}%`}>
        <StyledImage src={background1} preview={false} width={'100%'} />
      </StyledLayout.Sider>
    </StyledLayout>
  );
};
