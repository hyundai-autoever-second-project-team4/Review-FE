import React, { useState, useEffect } from "react";
import CustomModal from "../CustomModal/CustomModal";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import { useAlarmMutation } from "../../hooks/useAlarmMutation";
import { readAllAlrams } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import Swal from "sweetalert2";

const Default = styled.p`
  color: ${theme.colors.gray3};
  font-size: ${theme.fontSizes.sub1};
  width: 100%;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 0 8px;
`;

const AlarmWrapper = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  border-radius: ${theme.borderRadius.md};
  padding: 8px 12px;
  font-size: ${theme.fontSizes.sub1};
  line-height: 20px;
  border: 1px solid ${theme.colors.gray2};
  justify-content: space-between;
`;

function AlarmModal({ modal, modalClose, alarms }) {
  const [islargeScreen, setIslargeScreen] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const { refetch } = useGetUserInfo();
  const { mutate: readAlarm } = useAlarmMutation();
  const { mutate: readAll } = useMutation({
    mutationFn: () => readAllAlrams(),
    onSuccess: () => {
      Swal.fire({
        text: "모든 알림을 읽었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
      refetch();
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIslargeScreen(window.innerWidth > 854);
      setIsMobileScreen(window.innerWidth < 538);
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

  const handleAlarmClick = (id) => {
    readAlarm(id);
  };

  return (
    <CustomModal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            paddingRight: "40px",
            justifyContent: "space-between",
          }}
        >
          <p>알림</p>
          {alarms.length !== 0 && <Button onClick={readAll}>모두 읽기</Button>}
        </div>
      }
      modal={modal}
      modalClose={modalClose}
      large={islargeScreen}
      badgeModalMobile={isMobileScreen}
    >
      <Container>
        {alarms.length === 0 ? (
          <Default>알림이 없습니다.</Default>
        ) : (
          alarms.map((alarm) => {
            return (
              <AlarmWrapper key={alarm.id}>
                <div>{alarm.message}</div>
                <Button
                  onClick={() => handleAlarmClick(alarm.id)}
                  style={{ minWidth: "56px" }}
                >
                  읽기
                </Button>
              </AlarmWrapper>
            );
          })
        )}
      </Container>
    </CustomModal>
  );
}

export default AlarmModal;
