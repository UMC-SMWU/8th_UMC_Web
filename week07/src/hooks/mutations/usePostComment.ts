import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import useGetMyInfo from "../queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";

interface CreateCommentParams {
  lpId: number;
  content: string;
}

const postComment = async ({ lpId, content }: CreateCommentParams) => {
  const res = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return res.data.data;
};

const usePostComment = (lpId: number, order: "asc" | "desc") => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();
  const { data: my } = useGetMyInfo(accessToken);

  return useMutation({
    mutationFn: postComment,
    onSuccess: (newComment) => {
      // 프론트에서 author 정보 붙이기 (백엔드가 응답에 안 줄 경우)
      if (!newComment.author && my?.data) {
        newComment.author = {
          id: my.data.id,
          name: my.data.name,
          email: my.data.email,
        };
      }

      queryClient.setQueryData(["comments", lpId, order], (old: any) => {
        if (!old) return;
        const updatedPage = {
          ...old.pages[0],
          data:
            order === "asc"
              ? [...old.pages[0].data, newComment]
              : [newComment, ...old.pages[0].data],
        };

        return {
          ...old,
          pages: [updatedPage, ...old.pages.slice(1)],
        };
      });
    },
  });
};

export default usePostComment;