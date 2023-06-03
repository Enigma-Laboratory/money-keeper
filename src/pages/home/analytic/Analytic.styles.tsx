import styled from "styled-components";

export const AnalyticStyled = styled.div`
  height: 80vh;
  overflow-y: scroll;
  width: 300px;
  border-left: 1px solid gray;
  padding: 10px;
  .card {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    padding: 0px 5px;
    margin-top: 15px;
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
  .btn-view-more {
    width: 100%;
    margin-top: 10px;
  }
`;
