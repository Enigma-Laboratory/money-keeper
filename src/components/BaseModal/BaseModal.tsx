import React, { ReactElement, useState } from 'react';
import { BaseModalStyled } from './BaseModal.styles';

export interface BaseModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
}

export const BaseModal = (props: BaseModalProps): ReactElement => {
  const { handleCancel, handleOk, isModalOpen } = props;

  return (
    <BaseModalStyled title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p className="header">Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </BaseModalStyled>
  );
};
