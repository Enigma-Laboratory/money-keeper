import { Button } from 'antd';
import { AlertModalPayload } from 'interface';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EVENT_NAME } from 'utils';
import { EventAction } from 'utils/customEvent';

import { BaseModal, BaseModalProps } from '../BaseModal';
import { HeaderAlertModal } from './HeaderAlertModal';

export const AlertModal = (props: BaseModalProps): ReactElement => {
  const { t } = useTranslation('common');

  const [modalSource, setModalSource] = useState<AlertModalPayload>({ data: { type: 'info' } });
  const { data, dispatch } = modalSource;

  const openModal = (payload: CustomEvent<AlertModalPayload>) => {
    const { detail } = payload || {};
    setModalSource((prev) => ({
      data: { ...prev.data, ...detail.data, isOpen: true },
      dispatch: { ...prev.dispatch, ...detail?.dispatch },
    }));
  };

  const closeModal = () => {
    dispatch?.handleCancel?.();
    setModalSource((prev) => ({
      ...prev,
      data: { ...prev.data, isOpen: false },
    }));
  };

  const handleOk = (): void => {
    dispatch?.handleOk?.();
    setModalSource((prev) => ({
      ...prev,
      data: { ...prev.data, isOpen: false },
    }));
  };

  useEffect(() => {
    EventAction.on(EVENT_NAME.OPEN_MODAL, openModal);
    return () => {
      EventAction.remove(EVENT_NAME.OPEN_MODAL, openModal);
    };
  }, []);

  useEffect(() => {}, [modalSource]);

  const renderHeader = useMemo(() => <HeaderAlertModal title={data?.title} type={data.type} />, [modalSource]);

  const renderFooter = () => {
    const buttons: React.ReactNode[] = [<Button onClick={closeModal}>{t('alertTitle.close')}</Button>];
    if (data.type === 'confirm') {
      buttons.push(
        <Button type="primary" onClick={handleOk}>
          {t('alertTitle.ok')}
        </Button>,
      );
    }
    return buttons;
  };

  return (
    <BaseModal closable={false} open={data?.isOpen} footer={renderFooter} {...props} title={renderHeader}>
      <div style={{ textAlign: 'center' }}>{data?.content}</div>
    </BaseModal>
  );
};
