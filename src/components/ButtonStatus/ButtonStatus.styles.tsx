import { OrderStatus } from '@enigma-laboratory/shared';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

export const StyledButtonStatus = styled(Button)<{ status: string }>`
  /* background: rgba(221, 235, 250, 0.3); */
  ${({ status }) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return css`
          color: #007bff;
          border: 1px solid rgba(0, 123, 255, 0.7);
        `;
      case OrderStatus.CONFIRM:
        return css`
          color: #32cd32;
          border: 1px solid rgba(50, 205, 50, 0.4);
        `;
      case OrderStatus.DONE:
        return css`
          color: white;
          border: 1px solid #b7eb8f;
          background: green;
        `;
      case OrderStatus.CANCELLED:
        return css`
          color: white;
          background: #e80404;
        `;
      default:
        return null;
    }
  }}
`;
