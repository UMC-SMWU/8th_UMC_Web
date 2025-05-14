import { useMutation } from "@tanstack/react-query";
import { deleteLp, patchLp, postLp } from "../../api/LpService";
import { RequestPostLpDto } from "../../types/lp.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";

function useLps() {
  return useMutation({
    mutationFn: postLp,
    onSuccess: (data) => {
      console.log("Post LP Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

function usePatchLp() {
  return useMutation({
    mutationFn: ({
      lpId,
      requestPatchLpDto,
    }: {
      lpId: number;
      requestPatchLpDto: RequestPostLpDto;
    }) => patchLp(lpId, requestPatchLpDto),
    onSuccess: (data) => {
      console.log("Patch LP Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.id],
      });
    },
  });
}

function useDeleteLp() {
  return useMutation({
    mutationFn: deleteLp,
    onSuccess: (data) => {
      console.log("Delete LP Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      window.location.href = "/";
    },
    onError: (error) => console.error(error),
  });
}

export { useLps, usePatchLp, useDeleteLp };
