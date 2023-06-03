import styled from "styled-components";
import { BaseLayout } from "components";

export const LayoutMainStyled = styled(BaseLayout)`
  height: 100vh;
  .ant-layout-header {
    line-height: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;

    .logo {
      /* display: flex; */
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
  }
`;
