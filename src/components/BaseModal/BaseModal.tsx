import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { BaseModalStyled } from './BaseModal.styles';
import { ModalProps } from 'antd';

export interface BaseModalProps extends PropsWithChildren, ModalProps {}

export const BaseModal = (props: BaseModalProps): ReactElement => {
  const { title, children, ...remaining } = props;

  return (
    <BaseModalStyled title={title} {...remaining}>
      {children}
    </BaseModalStyled>
  );
};
