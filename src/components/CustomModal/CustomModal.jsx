import React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import theme from "../../styles/theme";

const Container = styled.div`
  width: ${({ $large }) => ($large ? `800px` : `550px`)};
  min-width: ${({ $large }) => ($large ? `800px` : `550px`)};
  position: relative;
`;

const TitleArea = styled.div`
  height: 100px;
  width: ${({ $large }) => ($large ? `800px` : `550px`)};
  min-width: ${({ $large }) => ($large ? `800px` : `550px`)};
  padding: 0 40px;
  position: fixed;
  border-bottom: 1px solid ${theme.colors.neutral200};

  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  z-index: 9999;
`;

const ContentArea = styled.div`
  margin-top: 100px;
  max-height: 400px;
  padding: 28px 36px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 0 0 30px 30px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 241, 255, 0.8);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 5px 0;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 36px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

function CustomModal({ modal, modalClose, large, title, children }) {
  return (
    <Modal
      open={modal}
      onClose={modalClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        border: "none",
        backgroundColor: "none",
        "& > *": {
          borderRadius: "1px",
          outline: "none",
        },
      }}
    >
      <Container $large={large}>
        <TitleArea $large={large}>
          <div>{title}</div>
          <CloseButton onClick={modalClose}>
            <img src="/close-circle.svg" alt="" />
          </CloseButton>
        </TitleArea>
        <ContentArea>{children}</ContentArea>
      </Container>
    </Modal>
  );
}

export default CustomModal;
