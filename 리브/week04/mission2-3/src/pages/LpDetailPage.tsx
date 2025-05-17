import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { ResponseLpDetailDto } from "../types/lp";
import { timeAgo } from "../utils/timeAgo";
import { Pencil, Trash2, Check } from "lucide-react";
import CommentSection from "../components/Comment/CommentSection";
import { useState } from "react";
import { useUploadImage } from "../hooks/mutations/useUploadImage";
import { useUpdateLp } from "../hooks/mutations/useUpdateLp";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import { useToggleLike } from "../hooks/mutations/useToggleLike";
import { useAuth } from "../context/AuthContext";

const LpDetailPage = () => {
  const { LPid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate: updateLp } = useUpdateLp();
  const { mutate: deleteLp } = useDeleteLp();
  const { mutateAsync: uploadImage } = useUploadImage();

  const [editMode, setEditMode] = useState(false);

  const { data: response, isLoading, isError } = useQuery<ResponseLpDetailDto>({
    queryKey: ["lp", LPid],
    queryFn: () => getLpDetail(Number(LPid)),
    enabled: !!LPid,
  });

  if (isLoading)
    return <div className="text-white text-center mt-20">로딩 중...</div>;
  if (isError || !response?.data)
    return <div className="text-white text-center mt-20">LP 정보를 불러오지 못했습니다.</div>;

  const lp = response.data;

  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [tags, setTags] = useState(lp.tags.map((tag) => tag.name));
  const [thumbnail, setThumbnail] = useState(lp.thumbnail);

  const isLiked = lp.likes.some((like) => like.userId === user?.id);
  const { mutate: toggleLike } = useToggleLike(lp.id, isLiked);

  const handleToggleLike = () => {
    toggleLike(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lp", LPid] });
      },
    });
  };

  const handleUpdate = () => {
    updateLp(
      {
        lpId: Number(LPid),
        title,
        content,
        tags,
        thumbnail,
      },
      {
        onSuccess: () => {
          setEditMode(false);
          queryClient.invalidateQueries({ queryKey: ["lp", LPid] });
        },
      },
    );
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLp(lp.id, {
        onSuccess: () => navigate("/"),
      });
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      setThumbnail(url);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center pt-24 px-4 pb-40">
      <div className="bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-xl shadow-xl relative">
        {/* 작성자 + 수정 삭제 */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">
              {lp.author.name.charAt(0)}
            </div>
            <span className="font-semibold text-sm">{lp.author.name}</span>
          </div>
          <div className="flex gap-2 text-gray-400">
            {editMode ? (
              <button onClick={handleUpdate}><Check size={18} /></button>
            ) : (
              <button onClick={() => setEditMode(true)}><Pencil size={18} /></button>
            )}
            <button onClick={handleDelete}><Trash2 size={18} /></button>
          </div>
        </div>

        {/* 시간 */}
        <p className="text-right text-xs text-gray-500 mb-1">{timeAgo(lp.createdAt)}</p>

        {/* 제목 */}
        {editMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold bg-transparent border-b border-gray-500 w-full mb-4 text-center"
          />
        ) : (
          <h1 className="text-xl font-bold text-white mb-6 text-center">{lp.title}</h1>
        )}

        {/* LP 이미지 디스크 */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 rounded-full  overflow-hidden relative border-8 border-black">
            <img
              src={thumbnail}
              alt="LP 디스크"
              className="w-full h-full object-cover rounded-full animate-spin-slow"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 설명 */}
        {editMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-transparent border border-gray-600 rounded w-full text-white p-2 mb-6"
          />
        ) : (
          <p className="text-sm text-gray-300 leading-relaxed text-center mb-6 px-4 whitespace-pre-wrap">
            {lp.content}
          </p>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {editMode ? (
            <>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#2f2f2f] px-3 py-1 rounded-full text-sm text-white"
                >
                  #{tag}
                  <button
                    className="ml-2 text-red-400"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="태그 입력 후 Enter"
                className="bg-black border border-gray-600 rounded px-2 py-1 text-sm text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value && !tags.includes(value)) {
                      setTags([...tags, value]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </>
          ) : (
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#2f2f2f] px-3 py-1 rounded-full text-sm text-white"
              >
                #{tag}
              </span>
            ))
          )}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center">
          <button
            className={`text-lg ${isLiked ? "text-pink-400" : "text-white"}`}
            onClick={handleToggleLike}
          >
            ❤️ {lp.likes.length}
          </button>
        </div>

        <div className="mt-10 px-4 max-w-xl mx-auto">
          <CommentSection lpId={lp.id} />
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;




