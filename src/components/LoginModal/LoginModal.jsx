import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import { Container, KakaoBtn } from "./LoginModalStyle";

function LoginModal({ modalOpen, modalClose, handleLogin }) {
  if (!modalOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  const [islargeScreen, setIslargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIslargeScreen(window.innerWidth > 854);
    };

    // 초기 화면 크기 체크
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <CustomModal
      modal={modalOpen}
      modalClose={modalClose}
      title={"ThearUp 소셜 로그인"}
      titleHeight={"60px"}
      large={islargeScreen}
    >
      <Container>
        <KakaoBtn onClick={handleLogin}>
          <img
            src={"/images/kakao_icon.svg"}
            alt="Kakao Icon"
            width="24"
            height="24"
          />
          카카오계정으로 로그인
        </KakaoBtn>
      </Container>
    </CustomModal>
  );
}

export default LoginModal;
