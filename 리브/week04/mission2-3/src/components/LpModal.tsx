import { useState, useRef } from "react";
import { useUploadImage } from "../hooks/mutations/useUploadImage";

interface LpData {
  name: string;
  content: string;
  tags: string[];
  thumbnail: string;
}

interface LpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LpData) => void;
}

const LpModal = ({ isOpen, onClose, onSubmit }: LpModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadImage } = useUploadImage();

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    let thumbnail = "https://example.com/default.png";
    if (image) {
      try {
        thumbnail = await uploadImage(image);
      } catch (err) {
        alert("이미지 업로드 실패");
        return;
      }
    }

    onSubmit({
      name: lpName,
      content: lpContent,
      tags,
      thumbnail,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-[#2a2a2a] text-white p-6 rounded-xl w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-2xl">
          ×
        </button>

        <div className="flex justify-center mb-6 cursor-pointer" onClick={handleImageClick}>
          <img
            src={preview || "/default-lp.png"}
            alt="LP Thumbnail"
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        <input
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          placeholder="LP Name"
          className="w-full p-3 mb-3 rounded bg-[#1a1a1a] border border-gray-600 placeholder-gray-400"
        />
        <input
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          placeholder="LP Content"
          className="w-full p-3 mb-3 rounded bg-[#1a1a1a] border border-gray-600 placeholder-gray-400"
        />
        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="flex-1 p-3 rounded bg-[#1a1a1a] border border-gray-600 placeholder-gray-400"
          />
          <button
            onClick={handleAddTag}
            className="bg-pink-500 hover:bg-pink-600 px-4 rounded text-white font-semibold"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white text-black px-2 py-1 rounded-full flex items-center text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-xs text-gray-600 hover:text-black"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!lpName || !lpContent}
          className={`w-full py-3 rounded font-bold transition-colors ${
            lpName && lpContent
              ? "bg-pink-500 hover:bg-pink-600 text-white"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LpModal;


