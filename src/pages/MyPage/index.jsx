import React from "react";
import styled from "styled-components";
const Container = styled.div`
  margin-top: 72px;
  padding: 20px 0;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 20px;
  }
`;

function MyPage() {
  return (
    <>
      <Container>MyPage</Container>
    </>
  );
}

export default MyPage;
