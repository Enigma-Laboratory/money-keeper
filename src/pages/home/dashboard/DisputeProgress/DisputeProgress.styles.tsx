import { Card } from "antd";
import styled from "styled-components";

export const DisputeProgressStyled = styled(Card)`
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
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .generated,
    .removed {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #f3e0d8;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: #dca684;
        }
      }
      p {
        margin: 0;
      }
      .title {
        font-weight: bold;
        font-size: 20px;
      }
    }

    .removed {
      .circle {
        background-color: #dddcfc;
        .icon {
          color: #6a69ab;
        }
      }
    }
  }
`;
