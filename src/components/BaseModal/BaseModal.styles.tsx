import styled from 'styled-components';
import Modal from 'antd/es/modal/Modal';

export const BaseModalStyled = styled(Modal)`
  .ant-modal-content {
    .header {
      background-color: red;
    }
  }
  .ant-modal-footer {
    background-color: red;
  }
`;
