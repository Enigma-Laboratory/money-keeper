import { Card } from "antd";
import styled from "styled-components";

export const CreditByCategoryStyled = styled(Card)`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .group {
      p {
        margin: 0;
      }
      .title {
        font-weight: bold;
      }
    }
  }
  .card {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #dddcf9;
    border-radius: 20px;
    padding: 20px 5px;
    margin-top: 10px;
    .content {
      p {
        margin: 0;
      }
      .title {
        font-weight: bold;
      }
    }
    .price {
      font-weight: bold;
      margin: 0;
    }
  }
`;
