import { Button, ButtonProps } from 'antd';
import { useTranslation } from 'react-i18next';
interface AlertModalFooterProps extends ButtonProps {
  confirmInput?: string;
  onClick?: () => Promise<void>;
  loading: boolean;
  confirmName?: string;
}
export const AlertModalFooter = (props: AlertModalFooterProps) => {
  const { confirmInput, confirmName, onClick, loading, ...remaining } = props;
  const { t } = useTranslation('common');

  return (
    <Button
      type="primary"
      onClick={onClick}
      loading={loading}
      disabled={!(confirmInput === confirmName)}
      {...remaining}
    >
      {t('alert.delete')}
    </Button>
  );
};
