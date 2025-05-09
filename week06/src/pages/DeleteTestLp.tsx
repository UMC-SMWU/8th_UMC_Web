import { useEffect } from "react";
import { axiosInstance } from "../apis/axios";

const DeleteTestLp = () => {
  useEffect(() => {
    const deleteLp = async () => {
      try {
        const res = await axiosInstance.delete("/v1/lps/419");
        console.log("삭제 성공:", res.data);
        alert("Lp가 성공적으로 삭제되었습니다!");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    };

    deleteLp();
  }, []);

  return (
    <div className="text-white text-center mt-10">삭제 요청 전송 중...</div>
  );
};

export default DeleteTestLp;
