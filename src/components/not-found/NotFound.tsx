import { Button, Result } from 'antd';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = (): ReactElement => {
  const { t } = useTranslation('common');
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('pageNotFound')}
      extra={
        <Button type="primary">
          <Link to={'/'}> {t('backToHome')}</Link>
        </Button>
      }
    />
  );
};
