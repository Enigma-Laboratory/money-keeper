import { Button } from 'antd';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EVENT_NAME } from 'utils';
import { EventAction } from 'utils/customEvent';
import { BaseModal, BaseModalProps } from '../BaseModal';
import { HeaderAlertModal } from './HeaderAlertModal';

export type AlertModalType = 'confirm' | 'warning' | 'info' | 'error' | 'success';

export interface IAlertModalPayload {
  data: {
    isOpen?: boolean;
    title?: string;
    type: AlertModalType;
    content?: string;
  };
  dispatch?: {};
}

export const AlertModal = (props: BaseModalProps): ReactElement => {
  const { t } = useTranslation('common');

  const [modalSource, setModalSource] = useState<IAlertModalPayload>({ data: { type: 'info' } });

  const openModal = (payload: CustomEvent<IAlertModalPayload>) => {
    const { detail } = payload || {};
    setModalSource((prev) => ({
      data: { ...prev.data, ...detail.data, isOpen: true },
      dispatch: { ...prev.dispatch, ...detail?.dispatch },
    }));
  };

  const closeModal = () => {
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

  const renderHeader = useMemo(
    () => <HeaderAlertModal title={modalSource.data?.title} type={modalSource.data.type} />,
    [modalSource],
  );

  const renderFooter = () => {
    return [
      <Button type="primary" onClick={closeModal}>
        {t('alertTitle.close')}
      </Button>,
    ];
  };

  return (
    <BaseModal closable={false} open={modalSource.data?.isOpen} footer={renderFooter} {...props} title={renderHeader}>
      {modalSource.data?.content}
    </BaseModal>
  );
};
