import React from "react";
import Button from "../../components/Button/Button";

function MyPage() {
  return (
    <>
      <Button>로그인</Button>  {/* 배경색을 빨간색으로 설정 */}
      <Button color="primary">작성</Button>  {/* 배경색을 빨간색으로 설정 */}
      <Button size="large">프로필 편집</Button>  {/* 기본 배경색(노란색) */}
      <Button color="primary" size="large">뱃지 조건</Button>  {/* 배경색을 빨간색으로 설정 */}
    </>
  )
  
}

export default MyPage;
