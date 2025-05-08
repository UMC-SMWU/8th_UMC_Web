import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { toast } from "react-toastify";

interface LpUploadDto {
  name: string;
  content: string;
  tags: string[];
  thumbnail?: string;
}

export const useUploadLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LpUploadDto) => {
      const response = await axiosInstance.post("/v1/lps", {
        title: data.name,
        content: data.content,
        tags: data.tags,
        thumbnail: data.thumbnail || "https://example.com/default.png",
        published: true,
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("LP가 성공적으로 업로드되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
    },
    onError: (error: any) => {
      toast.error(`업로드 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};



