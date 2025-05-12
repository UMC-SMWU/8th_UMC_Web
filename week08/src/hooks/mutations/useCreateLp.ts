import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

const createLp = async (body: {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}) => {
  const res = await axiosInstance.post("/v1/lps", body);
  return res.data.data;
};

const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps", "", "desc"] });
    },
  });
};

export default useCreateLp;