import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';
export const HeaderLayoutStyled = styled(Header)`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: white; */
  padding: 0;

  .logo {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title,
    .created-by {
      width: 200px;
      margin: 0;
    }
    .title {
      font-weight: bold;
    }
  }

  .container-notify {
    padding-left: 20px;
  }
`;
