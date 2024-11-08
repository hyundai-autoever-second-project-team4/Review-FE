import React from "react";
import { useNavigate } from "react-router-dom";

function MovieDetail() {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(-1);
  };
  return (
    <div>
      MovieDetail
      <button onClick={handleBtnClick}>뒤로가기</button>
    </div>
  );
}

export default MovieDetail;
