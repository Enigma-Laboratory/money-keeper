import { Button, Result } from 'antd';
import { AlertModalPayload } from 'interface';
import { ReactElement, cloneElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EVENT_NAME } from 'utils';
import { EventAction } from 'utils/customEvent';

import { ResultStatusType } from 'antd/es/result';
import { BaseModal, BaseModalProps } from '../BaseModal';
import { AlertModalExtra } from './AlertModalExtra';
import { AlertModalFooter } from './AlertModalFooter';

interface AlertModalProps extends AlertModalPayload {
  isLoadingButton: boolean;
  confirmInput?: string;
  placeholderInput?: string;
  footer: JSX.Element[];
  resultData: {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    extra: React.ReactNode;
  };
}

export const AlertModal = (props: BaseModalProps): ReactElement => {
  const { t } = useTranslation('common');
  const initModalSource: AlertModalProps = {
    data: { type: 'info' },
    isLoadingButton: false,
    footer: [],
    resultData: {
      status: 'info',
      title: '',
      subTitle: '',
      extra: <></>,
    },
  };
  const [modalSource, setModalSource] = useState<AlertModalProps>(initModalSource);
  const { data, dispatch } = modalSource;
  console.log(modalSource);
  const openModal = (payload: CustomEvent<AlertModalPayload>) => {
    const { detail } = payload || {};
    setModalSource((prev) => ({
      ...prev,
      data: { ...prev.data, ...detail.data, isOpen: true },
      dispatch: { ...prev.dispatch, ...detail?.dispatch },
    }));
  };

  const closeModal = () => {
    dispatch?.handleCancel?.();
    setModalSource(initModalSource);
  };

  const handleOk = async (): Promise<void> => {
    setModalSource((prev) => ({ ...prev, isLoadingButton: true }));
    try {
      await dispatch?.handleOk?.();
    } catch (error) {
      console.log(error);
    } finally {
      setModalSource(initModalSource);
    }
  };

  useEffect(() => {
    EventAction.on(EVENT_NAME.OPEN_MODAL, openModal);
    return () => {
      EventAction.remove(EVENT_NAME.OPEN_MODAL, openModal);
    };
  }, []);

  useEffect(() => {
    setModalSource((prev) => {
      const newFooter: JSX.Element[] = [
        prev.footer?.[0] || <></>,
        cloneElement(prev.footer?.[1] || <></>, {
          confirmInput: prev.confirmInput,
          confirmName: prev.data.confirmName,
          onClick: handleOk,
          loading: prev.isLoadingButton,
        }),
      ];
      return {
        ...prev,
        footer: newFooter,
        resultData: {
          ...prev.resultData,
          extra: (
            <AlertModalExtra
              setModalSource={setModalSource}
              placeholder={prev.placeholderInput || ''}
              value={prev.confirmInput || ''}
              confirmName={prev.data.confirmName || ''}
            />
          ),
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalSource.confirmInput, modalSource.isLoadingButton]);

  useEffect(() => {
    const initFooter: JSX.Element[] = [<Button onClick={closeModal}>{t('alertTitle.close')}</Button>];
    const initPlaceholderInput = 'Please type confirm input...';
    switch (modalSource.data.type) {
      case 'delete':
        setModalSource((prev) => {
          initFooter.push(
            <AlertModalFooter
              confirmInput={prev.confirmInput}
              confirmName={modalSource.data.confirmName}
              onClick={handleOk}
              loading={modalSource.isLoadingButton}
            />,
          );
          return {
            ...prev,
            footer: initFooter,
            placeholderInput: initPlaceholderInput,
            resultData: {
              ...prev.resultData,
              status: 'warning',
              title: 'Are you sure you want to delete this order?',
              subTitle: 'Do you really want to delete these records? This process cannot be undone.',
              extra: (
                <AlertModalExtra
                  setModalSource={setModalSource}
                  placeholder={initPlaceholderInput}
                  value={prev.confirmInput || ''}
                  confirmName={prev.data.confirmName || ''}
                />
              ),
            },
          };
        });
        break;
      case 'info':
        setModalSource((prev) => ({ ...prev }));
        break;
      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalSource.data.isOpen]);

  return (
    <BaseModal closable={false} open={data?.isOpen} footer={modalSource.footer} {...props}>
      <Result
        style={{ padding: 0 }}
        status={modalSource.resultData.status}
        title={modalSource.resultData.title}
        subTitle={modalSource.resultData.subTitle}
        extra={[modalSource.resultData.extra]}
      />
    </BaseModal>
  );
};
