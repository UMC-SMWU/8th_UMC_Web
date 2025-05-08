import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UploadImageResponse {
  status: boolean;
  message: string;
  data: {
    imageUrl: string;
  };
}

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post<UploadImageResponse>(
        "/v1/uploads/public",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data.data.imageUrl;
    },
  });
};
