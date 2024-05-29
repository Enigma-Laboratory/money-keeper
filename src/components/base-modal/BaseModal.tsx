import { ModalProps } from 'antd';
import { PropsWithChildren, ReactElement } from 'react';
import { StyledBaseModal } from './BaseModal.styles';

export interface BaseModalProps extends PropsWithChildren, ModalProps {}

export const BaseModal = (props: BaseModalProps): ReactElement => {
  const { title, children, ...remaining } = props;

  return (
    <StyledBaseModal title={title} {...remaining}>
      {children}
    </StyledBaseModal>
  );
};
