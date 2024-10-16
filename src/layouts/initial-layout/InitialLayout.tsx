import { DownOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { USAFlagIcon, VietnamFlagIcon } from 'assets/icons';
import backgroundLogin from 'assets/images/background-login.webp';
import backgroundWithoutLogin from 'assets/images/background-without-login.webp';
import { appConfig } from 'config';
import { Languages, i18n, useConfigProvider } from 'contexts';
import { ERROR_IMAGE, LANGUAGE } from 'utils';

import dayjs from 'dayjs';
import { StyledLayout } from './InitialLayout.Layout.styles';
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
  const { mode } = useConfigProvider();
  const GOLDEN_RATIO: number = 196 / 7;
  const path = pathname.substring(1) as 'login' | 'register' | 'forgot';

  const CardTitle = <StyledTypography.CardTitle level={3}>{t(`${path}.title`)}</StyledTypography.CardTitle>;

  const changeLanguage = (langType: Languages) => {
    i18n.changeLanguage(langType);
    dayjs.locale(langType);
  };

  const content = (
    <div>
      <LanguageButton type="text" onClick={() => changeLanguage(Languages.VI)}>
        <VietnamFlagIcon style={{ height: '22px', width: '30px', marginRight: '6px' }} />
        {LANGUAGE.VI}
      </LanguageButton>
      <LanguageButton type="text" onClick={() => changeLanguage(Languages.EN)}>
        <USAFlagIcon style={{ height: '22px', width: '30px', marginRight: '6px' }} />
        {LANGUAGE.EN}
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
        <StyledImage src={backgroundLogin} preview={false} width={'100%'} fallback={ERROR_IMAGE} />
      </StyledLayout.Sider>
    </StyledLayout>
  );
};
