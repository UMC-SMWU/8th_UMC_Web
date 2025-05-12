import { useState } from "react";
import { axiosInstance } from "../apis/axios";
import useCreateLp from "../hooks/mutations/useCreateLp";

interface Props {
  onClose: () => void;
}

const NewLpForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate, isPending } = useCreateLp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (thumbnailFile) {
        const imageForm = new FormData();
        imageForm.append("file", thumbnailFile);

        const uploadRes = await axiosInstance.post("/v1/uploads", imageForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.data.imageUrl;
      }

      const body = {
        title,
        content,
        thumbnail: imageUrl,
        tags: tagList,
        published: true,
      };

      mutate(body, {
        onSuccess: () => {
          setTitle("");
          setContent("");
          setThumbnailFile(null);
          setTagInput("");
          setTagList([]);
          onClose();
        },
        onError: (err) => {
          console.error("등록 실패:", err.message);
          setMessage("등록에 실패했습니다.");
        },
      });
    } catch (error) {
      console.error("LP 등록 실패:", error);
      setMessage("등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tagList.includes(trimmed)) {
      setTagList([...tagList, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTagList(tagList.filter((t) => t !== tag));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-300 p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">새 LP 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded text-black"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded text-black"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded text-black"
            onChange={(e) =>
              setThumbnailFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 border rounded text-black"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 bg-pink-700 text-white rounded hover:bg-pink-800"
            >
              추가
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-black px-3 py-1 rounded-full"
              >
                <span className="mr-2 text-sm">#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={isPending || isSubmitting}
            className="w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-800 disabled:opacity-50"
          >
            {isPending || isSubmitting ? "등록 중..." : "등록"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-black">{message}</p>
        )}
      </div>
    </div>
  );
};

export default NewLpForm;
