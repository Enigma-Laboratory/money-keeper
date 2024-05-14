import { Button, Form, Input, Result, Typography } from 'antd';
import { AlertModalPayload } from 'interface';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EVENT_NAME } from 'utils';
import { EventAction } from 'utils/customEvent';

import { BaseModal, BaseModalProps } from '../BaseModal';

export const AlertModal = (props: BaseModalProps): ReactElement => {
  const { t } = useTranslation('common');

  const [modalSource, setModalSource] = useState<AlertModalPayload>({ data: { type: 'info' } });
  const { data, dispatch } = modalSource;
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

  const [inputConfirm, setInputConfirm] = useState<string>();

  const [isValid, setIsValid] = useState<boolean>(false);

  const openModal = (payload: CustomEvent<AlertModalPayload>) => {
    const { detail } = payload || {};
    setModalSource((prev) => ({
      data: { ...prev.data, ...detail.data, isOpen: true },
      dispatch: { ...prev.dispatch, ...detail?.dispatch },
    }));
  };

  const closeModal = () => {
    dispatch?.handleCancel?.();
    setIsValid(false);
    setInputConfirm('');
    setModalSource((prev) => ({
      ...prev,
      data: { ...prev.data, isOpen: false },
    }));
  };

  const handleOk = async (): Promise<void> => {
    setIsLoadingModal(true);
    try {
      await dispatch?.handleOk?.();
      setModalSource((prev) => ({
        ...prev,
        data: { ...prev.data, isOpen: false },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingModal(false);
      setInputConfirm('');
    }
  };

  useEffect(() => {
    EventAction.on(EVENT_NAME.OPEN_MODAL, openModal);
    return () => {
      EventAction.remove(EVENT_NAME.OPEN_MODAL, openModal);
    };
  }, []);

  useEffect(() => {}, [modalSource]);

  const renderFooter = () => {
    const buttons: React.ReactNode[] = [<Button onClick={closeModal}>{t('alertTitle.close')}</Button>];
    if (data.type === 'confirm') {
      buttons.push(
        <Button type="primary" onClick={handleOk} loading={isLoadingModal} disabled={!isValid}>
          {t('confirm.ok', 'Delete')}
        </Button>,
      );
    }
    return buttons;
  };

  const renderContentModal = (): ReactNode => {
    switch (data.type) {
      case 'confirm':
        return (
          <Result
            style={{ padding: 0 }}
            status="error"
            title="Are you sure you want to delete this order?"
            subTitle="Do you really want to delete these records? This process cannot be undone."
            extra={[
              <>
                <Typography.Text>{`Please type in the order name「${data.content}」to delete:`}</Typography.Text>
                <Form.Item required>
                  <Input
                    value={inputConfirm}
                    onChange={(e) => {
                      setInputConfirm(e.target.value);
                      setIsValid(data.content === e.target.value);
                    }}
                    placeholder="Please"
                    style={{ width: 400 }}
                  />
                </Form.Item>
              </>,
            ]}
          ></Result>
        );
      default:
        <div style={{ textAlign: 'center' }}>{data?.content}</div>;
    }
  };

  return (
    <BaseModal closable={false} open={data?.isOpen} footer={renderFooter} {...props}>
      {renderContentModal()}
    </BaseModal>
  );
};
