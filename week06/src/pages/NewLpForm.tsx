import { useState } from "react";
import { axiosInstance } from "../apis/axios";

const NewLpForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

      const response = await axiosInstance.post("/v1/lps", {
        title,
        content,
        thumbnail,
        tags: tagArray,
        published: true,
      });

      setMessage("✅ LP가 성공적으로 등록되었습니다!");
      console.log("등록 결과:", response.data);

      // 입력 초기화
      setTitle("");
      setContent("");
      setThumbnail("");
      setTags("");
    } catch (error) {
      console.error("LP 등록 실패:", error);
      setMessage("❌ 등록에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6">새 LP 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">설명</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">이미지 URL</label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">태그 (쉼표로 구분)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded text-lg font-semibold"
        >
          등록하기
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
    </div>
  );
};

export default NewLpForm;
