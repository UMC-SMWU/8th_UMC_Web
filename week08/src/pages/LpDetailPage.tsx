import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Pencil, Trash } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useAuth } from "../context/AuthContext";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import CommentSkeleton from "../components/CommentSkeleton";
import usePostComment from "../hooks/mutations/usePostComment";
import useDeleteComment from "../hooks/mutations/useDeleteComment";
import useUpdateComment from "../hooks/mutations/useUpdateComment";
import profile from "../assets/profile.png";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import { axiosInstance } from "../apis/axios";
import useDeleteLp from "../hooks/mutations/useDeleteLp";

import { queryClient } from "../App";

dayjs.extend(relativeTime);

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isEditingLp, setIsEditingLp] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);

  const deleteLpMutation = useDeleteLp();
  const handleDeleteLp = () => {
    if (confirm("정말 이 LP를 삭제하시겠습니까?")) {
      deleteLpMutation.mutate(Number(lpId));
    }
  };

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: my } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteComments(Number(lpId), order);

  const postCommentMutation = usePostComment(Number(lpId), order);
  const deleteMutation = useDeleteComment(Number(lpId), order);
  const updateMutation = useUpdateComment(Number(lpId), order);

  const [commentInput, setCommentInput] = useState("");
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const [editTargetId, setEditTargetId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  useEffect(() => {
    if (lp) {
      setEditedTitle(lp.data.title);
      setEditedContent(lp.data.content);
    }
  }, [lp]);

  const isLiked = lp?.data.likes.some((like) => like.userId === my?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  const updateLpMutation = useUpdateLp({
    onSuccess: (updatedLp) => {
      queryClient.setQueryData(["lpDetail", Number(lpId)], (old: any) => {
        if (!old) return;
        return {
          ...old,
          data: {
            ...old.data,
            ...updatedLp,
          },
        };
      });
    },
  });

  if (isPending || isError || !lp) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex justify-center">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-6 shadow-lg">
        {isEditingLp ? (
          <input
            className="text-2xl font-bold w-full text-white bg-zinc-800 p-2 rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-2xl font-bold">{editedTitle}</h1>
        )}
        <div className="w-full flex justify-center mb-6">
          <div
            className="w-80 h-80 rounded-full relative overflow-hidden animate-spin-slow cursor-pointer"
            onClick={() => {
              if (isEditingLp) {
                document.getElementById("lp-thumbnail-input")?.click();
              }
            }}
          >
            <img
              src={
                newThumbnail
                  ? URL.createObjectURL(newThumbnail)
                  : lp.data.thumbnail
              }
              alt="LP 커버"
              className="w-full h-full object-cover rounded-full border-8 border-black"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="lp-thumbnail-input"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewThumbnail(e.target.files[0]);
                }
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-18 h-18 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 shadow-md"
              style={{ backgroundColor: "rgb(220, 220, 220)" }}
            />
          </div>
        </div>
        {isEditingLp ? (
          <>
            <textarea
              className="text-sm text-white w-full p-2 rounded mb-4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="text-gray-300 text-sm mb-4 text-center max-w-xl mx-auto">
              {editedContent}
            </p>
          </>
        )}
        {isEditingLp ? (
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-1 rounded"
              onClick={() => setIsEditingLp(false)}
            >
              취소
            </button>
            <button
              className="bg-pink-600 text-white px-4 py-1 rounded"
              onClick={async () => {
                let thumbnailUrl = lp.data.thumbnail;
                if (newThumbnail) {
                  const formData = new FormData();
                  formData.append("file", newThumbnail);
                  const res = await axiosInstance.post(
                    "/v1/uploads",
                    formData,
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                    }
                  );
                  thumbnailUrl = res.data.data.imageUrl;
                }
                updateLpMutation.mutate(
                  {
                    lpId: Number(lpId),
                    title: editedTitle,
                    content: editedContent,
                    thumbnail: thumbnailUrl,
                  },
                  {
                    onSuccess: (updatedLp) => {
                      setEditedTitle(updatedLp.title);
                      setEditedContent(updatedLp.content);
                      setIsEditingLp(false);
                    },
                  }
                );
              }}
            >
              저장
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditingLp(true)}
              className="text-sm text-pink-500 underline"
            >
              <Pencil className="w-5 h-5 text-white" />
            </button>
            <button onClick={handleDeleteLp}>
              <Trash className="w-5 h-5 text-white hover:text-red-500" />
            </button>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart
              color={isLiked ? "red" : "white"}
              fill={isLiked ? "red" : "transparent"}
              className="w-6 h-6"
            />
          </button>
          <span className="ml-2 text-pink-400 font-semibold">
            {lp.data.likes.length}
          </span>
        </div>

        <div className="mt-8 p-4 border rounded bg-gray-300">
          <textarea
            className="w-full p-2 rounded resize-none text-gray-600"
            rows={2}
            placeholder="댓글을 입력하세요..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
            disabled={
              postCommentMutation.isPending || commentInput.trim() === ""
            }
            onClick={() => {
              postCommentMutation.mutate({
                lpId: Number(lpId),
                content: commentInput.trim(),
              });
              setCommentInput("");
            }}
          >
            작성
          </button>
        </div>

        <div className="flex justify-end mt-4 mb-4">
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="asc">오래된 순</option>
            <option value="desc">최신 순</option>
          </select>
        </div>

        <div className="space-y-4">
          {!data && isFetching
            ? Array.from({ length: 5 }).map((_, index) => (
                <CommentSkeleton key={index} />
              ))
            : data?.pages.flatMap((page) =>
                page.data.map((comment: any) => {
                  const isMine = comment.author?.id === my?.data.id;

                  return (
                    <div
                      key={comment.id}
                      className="p-4 border rounded shadow-sm bg-gray-300 text-black relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <img
                            src={
                              comment.author?.id === my?.data.id
                                ? my?.data.avatar || profile
                                : comment.author?.avatar || profile
                            }
                            alt="작성자 이미지"
                            className="w-8 h-8 rounded-full mr-2 object-cover border"
                          />
                          <span className="font-semibold">
                            {comment.author?.name ?? "익명"}
                          </span>
                        </div>

                        {isMine && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setVisibleMenuId((prev) =>
                                  prev === comment.id ? null : comment.id
                                )
                              }
                            >
                              ...
                            </button>
                            {visibleMenuId === comment.id && (
                              <div className="absolute right-0 bg-white border rounded shadow text-sm z-10 text-black">
                                <button
                                  className="block w-full px-3 py-2 hover:bg-gray-200"
                                  onClick={() => {
                                    setEditContent(comment.content);
                                    setEditTargetId(comment.id);
                                    setVisibleMenuId(null);
                                  }}
                                >
                                  <Pencil className="w-5 h-5 text-black" />
                                </button>
                                <button
                                  className="block w-full px-3 py-2 hover:bg-gray-200"
                                  onClick={() =>
                                    deleteMutation.mutate({
                                      lpId: Number(lpId),
                                      commentId: comment.id,
                                    })
                                  }
                                >
                                  <Trash className="w-5 h-5 text-black" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {editTargetId === comment.id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full p-2 rounded resize-none text-black border"
                            rows={2}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              className="px-3 py-1 rounded bg-pink-500 text-white"
                              onClick={() => {
                                updateMutation.mutate({
                                  commentId: comment.id,
                                  content: editContent,
                                });
                                setEditTargetId(null);
                              }}
                            >
                              저장
                            </button>
                            <button
                              className="px-3 py-1 rounded bg-gray-500 text-white"
                              onClick={() => setEditTargetId(null)}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{comment.content}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleString()
                              : ""}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })
              )}
        </div>

        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
};

export default LpDetailPage;
