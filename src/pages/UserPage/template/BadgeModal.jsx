import React from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";
import theme from "../../../styles/theme";
import styled from "styled-components";
import { badges } from "../../../utils/badges";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BadgeWrapper = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
`;

function BadgeModal({ modal, modalClose }) {
  return (
    <CustomModal
      title="뱃지 획득 조건"
      modal={modal}
      modalClose={modalClose}
      large
    >
      <Container>{badges}</Container>
    </CustomModal>
  );
}

export default BadgeModal;
