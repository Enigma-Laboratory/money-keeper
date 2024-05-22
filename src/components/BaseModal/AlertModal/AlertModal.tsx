import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { ReactElement, cloneElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AlertModalPayload } from 'interface';
import { EVENT_NAME } from 'utils';
import { EventAction } from 'utils/customEvent';

import { BaseModal, BaseModalProps } from '../BaseModal';
import { AlertModalExtra } from './AlertModalExtra';
import { ConfirmDeleteButton } from './AlertModalFooter';

export interface AlertModalProps extends AlertModalPayload {
  isOpen: boolean;
  isLoadingButton: boolean;
  footer: JSX.Element[];
  resultData: {
    status: ResultStatusType;
    extra: React.ReactNode;
    deleteType?: {
      input: string;
      placeholderInput?: string;
    };
  };
}

const BUTTON_KEY = {
  BUTTON_KEY_FIRST: 0,
  BUTTON_KEY_SECOND: 1,
};

export const AlertModal = (props: BaseModalProps): ReactElement => {
  const { t } = useTranslation('common');
  const initModalSource: AlertModalProps = {
    data: { type: 'info' },
    isOpen: false,
    isLoadingButton: false,
    footer: [],
    resultData: {
      status: 'info',
      extra: <></>,
    },
  };
  const [modalSource, setModalSource] = useState<AlertModalProps>(initModalSource);
  const { dispatch } = modalSource;

  const openModal = (payload: CustomEvent<AlertModalPayload>) => {
    const { detail } = payload || {};
    setModalSource((prev) => ({
      ...prev,
      isOpen: true,
      data: { ...prev.data, ...detail.data },
      dispatch: { ...prev.dispatch, ...detail.dispatch },
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
      console.error(error);
    } finally {
      setModalSource(initModalSource);
    }
  };

  const handleCancel = () => {
    setModalSource(initModalSource);
  };

  useEffect(() => {
    EventAction.on(EVENT_NAME.OPEN_MODAL, openModal);
    return () => {
      EventAction.remove(EVENT_NAME.OPEN_MODAL, openModal);
    };
  }, []);

  useEffect(() => {
    if (!modalSource.isOpen) return;
    const initFooter: JSX.Element[] = [
      <Button key={BUTTON_KEY.BUTTON_KEY_FIRST} onClick={closeModal}>
        {t('alert.close')}
      </Button>,
    ];
    switch (modalSource.data.type) {
      case 'delete': {
        const initPlaceholderInput = 'Please type confirm input...';
        setModalSource((prev) => {
          initFooter.push(
            <ConfirmDeleteButton
              key={BUTTON_KEY.BUTTON_KEY_SECOND}
              confirmInput={prev.resultData.deleteType?.input}
              confirmName={modalSource.data.confirmName}
              onClick={handleOk}
              loading={modalSource.isLoadingButton}
            />,
          );
          return {
            ...prev,
            footer: initFooter,
            data: {
              content: 'Are you sure you want to delete this order?',
              subContent: 'Do you really want to delete these records? This process cannot be undone.',
              ...prev.data,
            },
            resultData: {
              ...prev.resultData,
              status: 'warning',
              deleteType: {
                input: '',
                placeholderInput: initPlaceholderInput,
              },
              extra: (
                <AlertModalExtra
                  setModalSource={setModalSource}
                  placeholder={initPlaceholderInput}
                  value={prev.resultData.deleteType?.input}
                  confirmName={prev.data.confirmName}
                />
              ),
            },
          };
        });
        break;
      }

      case 'info': {
        setModalSource((prev) => ({
          ...prev,
          footer: initFooter,
          resultData: {
            ...prev.resultData,
            status: 'info',
          },
        }));
        break;
      }

      case 'success': {
        setModalSource((prev) => ({
          ...prev,
          footer: initFooter,
          resultData: {
            ...prev.resultData,
            status: 'success',
          },
        }));
        break;
      }

      case 'warning': {
        setModalSource((prev) => ({
          ...prev,
          footer: initFooter,
          resultData: {
            ...prev.resultData,
            status: 'warning',
          },
        }));
        break;
      }
    }
  }, [modalSource.isOpen]);

  // useEffect just perform when modal type is 'delete'
  useEffect(() => {
    if (modalSource.data.type !== 'delete') return;
    setModalSource((prev: AlertModalProps) => {
      const buttonClose = prev.footer?.[BUTTON_KEY.BUTTON_KEY_FIRST] || <></>;
      const buttonOk = prev.footer?.[BUTTON_KEY.BUTTON_KEY_SECOND] || <></>;

      const newFooter: JSX.Element[] = [
        buttonClose,
        cloneElement(buttonOk, {
          confirmInput: prev.resultData.deleteType?.input,
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
              placeholder={prev.resultData.deleteType?.placeholderInput}
              value={prev.resultData.deleteType?.input}
              confirmName={prev.data.confirmName}
            />
          ),
        },
      };
    });
  }, [modalSource.resultData.deleteType?.input, modalSource.isLoadingButton]);

  return (
    <BaseModal width={600} open={modalSource.isOpen} footer={modalSource.footer} {...props} onCancel={handleCancel}>
      <Result
        status={modalSource.resultData.status}
        title={modalSource.data.content}
        subTitle={modalSource.data.subContent}
        extra={modalSource.resultData.extra}
      />
    </BaseModal>
  );
};
