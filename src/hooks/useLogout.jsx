import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../api/api";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      Swal.fire({
        text: "로그아웃 되었습니다..",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        navigate("/");
      });
    },
  });
};
