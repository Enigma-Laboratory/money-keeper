import styled from 'styled-components';

export const StyledGroupsSetting = styled.div<{ $tableBodyHeight: number }>`
  .ant-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .pointer-cursor {
    cursor: pointer;
  }
  .ant-table-body {
    min-height: ${(props) => props.$tableBodyHeight}px;
    .process {
      min-width: 150;
    }
  }
`;
