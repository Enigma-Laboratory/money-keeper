import { ModalProps } from 'antd';
import { PropsWithChildren, ReactElement } from 'react';
import { BaseModalStyled } from './BaseModal.styles';

export interface BaseModalProps extends PropsWithChildren, ModalProps {}

export const BaseModal = (props: BaseModalProps): ReactElement => {
  const { title, children, ...remaining } = props;

  return (
    <BaseModalStyled title={title} {...remaining}>
      {children}
    </BaseModalStyled>
  );
};
