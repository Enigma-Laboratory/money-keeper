import logo from 'assets/images/background-1.webp';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import StyledLayout from './InitialLayout.Layout.styles';
import { StyledCard, StyledImage, StyledTypography } from './InitialLayout.styles';

interface InitialLayoutProps {
  children: ReactNode;
}

export const InitialLayout = ({ children }: InitialLayoutProps) => {
  const { t } = useTranslation('auth');
  const { pathname } = useLocation();

  const CardTitle = <StyledTypography.Title level={3}>{t(`${pathname.substring(1)}.title`)}</StyledTypography.Title>;

  return (
    <StyledLayout>
      <StyledLayout.Content>
        <StyledCard title={CardTitle}>{children}</StyledCard>
      </StyledLayout.Content>
      <StyledLayout.Sider width={'40%'}>
        <StyledImage src={logo} preview={false} />
      </StyledLayout.Sider>
    </StyledLayout>
  );
};
