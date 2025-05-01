import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../api/LpService";

function usePostLp() {
  return useMutation({
    mutationFn: postLp,
    onSuccess: (data) => {
      console.log("Post LP Success", data);
    },
  });
}

export default usePostLp;
