import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const AlertModalFooter = (props: {
  confirmInput?: string;
  onClick?: () => Promise<void>;
  loading: boolean;
  confirmName?: string;
}) => {
  const { confirmInput, confirmName, onClick, loading } = props;
  const { t } = useTranslation('common');

  return (
    <Button type="primary" onClick={onClick} loading={loading} disabled={!(confirmInput === confirmName)}>
      {t('confirm.ok', 'Delete')}
    </Button>
  );
};
