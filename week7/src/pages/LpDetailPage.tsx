import { useParams } from "react-router-dom";
import { Heart, Pencil, Trash2 } from "lucide-react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import formatDate from "../utils/formatDate";
import SortButton from "../components/SortButton";
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../types/common";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { useInView } from "react-intersection-observer";
import CommentItemSkeleton from "../components/CommentItemSkeleton";
import CommentItem from "../components/CommentItem";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuthContext } from "../context/AuthContext.tsx";
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";
import {
  useDeleteComment,
  usePatchComment,
  usePostComment,
} from "../hooks/mutations/useComment.ts";
import { useDeleteLp, usePatchLp } from "../hooks/mutations/useLps.ts";
import useTagManager from "../hooks/mutations/useTagManager.ts";
import img_lp_black from "../assets/img_lp_black.png";
import { handleFileChange } from "../utils/handleFileChange.ts";
import TextInput from "../components/TextInput.tsx";
import TagItem from "../components/TagItem.tsx";
import EditTagItem from "../components/EditTagItem.tsx";
import ThumbnailInput from "../components/ThumbnailInput.tsx";

export default function LpDetailPage() {
  const lpId = Number(useParams().lpId);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.ASC);
  const [comment, setComment] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const { accessToken } = useAuthContext();

  const { data: lpDetail } = useGetLpDetail(lpId);
  const { data: myInfo } = useGetMyInfo(accessToken);
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteComments(lpId, order, 10);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(img_lp_black);
  const { tags, tagInput, setTagInput, addTag, removeTag, setInitialTags } =
    useTagManager();

  useEffect(() => {
    if (lpDetail) {
      setTitle(lpDetail.data.title);
      setContent(lpDetail.data.content);
      setThumbnail(lpDetail.data.thumbnail);
      setInitialTags(lpDetail.data.tags.map((tag) => tag.name) || []);
    }
  }, [lpDetail, setInitialTags]);

  const { mutate: deleteLp } = useDeleteLp();
  const { mutate: patchLp } = usePatchLp();

  const handlePatchLp = () => {
    patchLp({
      lpId,
      requestPatchLpDto: {
        title,
        content,
        thumbnail,
        tags,
        published: true,
      },
    });
    setIsEditMode(false);
  };

  const handleEditMode = () => {
    if (isEditMode) {
      handlePatchLp();
    } else {
      setIsEditMode(true);
    }
  };

  const isLiked = lpDetail?.data.likes.some(
    (like) => like.userId === myInfo?.data.id,
  );
  const { mutate: postLike } = usePostLike();
  const { mutate: deleteLike } = useDeleteLike();
  const toggleLike = () => {
    if (isLiked) {
      deleteLike(lpId);
    } else {
      postLike(lpId);
    }
  };

  const { mutate: postComment } = usePostComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: patchComment } = usePatchComment();

  const handleCommentSubmit = () => {
    postComment({ lpId, requestPostCommentDto: { content: comment } });
    setComment("");
  };

  const handleCommentDelete = (commentId: number) => {
    deleteComment({ lpId, commentId });
  };

  const handleCommentPatch = (commentId: number, content: string) => {
    patchComment({ lpId, commentId, requestPatchCommentDto: { content } });
  };

  const renderComments = () => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, idx) => (
        <CommentItemSkeleton key={`loading-${idx}`} />
      ));
    }
    if (!comments) return null;
    return comments.pages.flatMap((page, pageIndex) =>
      page.data.data.map((comment) => (
        <CommentItem
          key={`${comment.id}-${pageIndex}`}
          avatar={comment.author.avatar}
          name={comment.author.name}
          content={comment.content}
          isMe={comment.author.id === myInfo?.data.id}
          onPatch={(newContent) => handleCommentPatch(comment.id, newContent)}
          onDelete={() => handleCommentDelete(comment.id)}
        />
      )),
    );
  };

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="flex-col justify-center items-center text-gray-300 py-10 px-30 gap-4 bg-[#3e3f43] mx-auto max-w-4xl mt-10 rounded-3xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={lpDetail?.data.author.avatar}
              alt="프로필 이미지"
              className="size-8 rounded-full bg-white"
            />
            <h1 className="text-xl font-bold">{lpDetail?.data?.author.name}</h1>
          </div>
          <span>
            {lpDetail?.data.createdAt
              ? formatDate(lpDetail.data.createdAt)
              : ""}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-6">
          {isEditMode ? (
            <TextInput
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"제목을 입력해주세요"}
              type={"text"}
              value={title}
              className={`w-full`}
            />
          ) : (
            <span className="text-2xl">{lpDetail?.data?.title}</span>
          )}

          <div className="flex items-center gap-2">
            <Pencil color="#BDBDBD" size={20} onClick={handleEditMode} />
            <Trash2 color="#BDBDBD" size={20} onClick={() => deleteLp(lpId)} />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="relative inline-flex justify-center items-center p-4 shadow-md shadow-black rounded-xl">
            <div className="absolute size-20 bg-white rounded-full z-10 border-2 border-gray-600" />
            <ThumbnailInput
              onChange={(e) => {
                handleFileChange(e, setThumbnail);
              }}
              thumbnail={thumbnail}
              imgClassName={`size-80 object-cover rounded-full border-4 border-black ${isEditMode ? "" : "animate-spin-slow"}`}
            />
          </div>
        </div>
        <div className="text-sm mt-6">
          {isEditMode ? (
            <textarea
              className="w-full h-40 border-1 border-gray-400 rounded-md p-4"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            lpDetail?.data?.content
          )}
        </div>
        <ul className="flex justify-center items-center gap-2 mt-10">
          {isEditMode ? (
            <div className="flex-col w-full gap-2">
              <div className="flex items-center gap-2 mb-4">
                <TextInput
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder={"LP Tag"}
                  type={"text"}
                  value={tagInput}
                  className={`flex-1`}
                />
                <button
                  className="bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-pink-600"
                  onClick={addTag}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <EditTagItem key={tag} tag={tag} onRemove={removeTag} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {lpDetail?.data?.tags.map((tag) => (
                <TagItem key={tag.id} name={tag.name} />
              ))}
            </>
          )}
        </ul>
        <div className="flex items-center gap-2 justify-center mt-8">
          <Heart
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
            onClick={toggleLike}
          />
          <span>{lpDetail?.data?.likes.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">댓글</span>
          <div className="flex justify-end items-center mt-4">
            <SortButton
              text="오래된순"
              selected={order === PAGINATION_ORDER.ASC}
              onClick={() => setOrder(PAGINATION_ORDER.ASC)}
              position="left"
            />
            <SortButton
              text="최신순"
              selected={order === PAGINATION_ORDER.DESC}
              onClick={() => setOrder(PAGINATION_ORDER.DESC)}
              position="right"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <TextInput
            onChange={(e) => setComment(e.target.value)}
            placeholder={"댓글을 입력해주세요"}
            type={"text"}
            value={comment}
            className={`flex-1`}
          />
          <button
            className="bg-gray-400 text-white rounded-md px-4 py-2"
            onClick={handleCommentSubmit}
          >
            작성
          </button>
        </div>
        <div className="flex-col w-full mt-4">{renderComments()}</div>

        {/* sentinel */}
        <div ref={ref} className="h-10" />
      </div>
    </>
  );
}
