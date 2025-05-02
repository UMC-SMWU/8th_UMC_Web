import { X } from "lucide-react";
import img_lp_black from "../assets/img_lp_black.png";
import { useState } from "react";
import { useLps } from "../hooks/mutations/useLps.ts";
import useTagManager from "../hooks/mutations/useTagManager.ts";

export default function LpCreateModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [thumbnail, setThumbnail] = useState<string>(img_lp_black);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { tags, setTagInput, addTag, removeTag } = useTagManager();
  const { mutate } = useLps();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setThumbnail(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitLp = () => {
    mutate({
      title: name,
      content: content,
      thumbnail: thumbnail,
      tags: tags,
      published: true,
    });
  };

  const isAddLpDisabled =
    !name || !content || !tags.length || thumbnail === img_lp_black;

  return (
    <div
      className="fixed inset-0 flex bg-black/30 justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#3e3f43] p-6 rounded-lg shadow-lg w-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="flex ml-auto" onClick={closeModal}>
          <X size={20} color="white" />
        </button>
        <label htmlFor="thumbnail-input" className="cursor-pointer">
          <img
            src={thumbnail}
            alt="LP Thumbnail"
            className="size-70 mx-auto mb-4 rounded-full"
          />
        </label>
        <input
          id="thumbnail-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="LP Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 text-white rounded-md p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 text-white rounded-md p-2 mb-4 w-full"
        />
        <div className="flex justify-between gap-2 mb-4">
          <input
            type="text"
            placeholder="LP Tag"
            onChange={(e) => setTagInput(e.target.value)}
            className="border border-gray-300 text-white rounded-md p-2 w-full"
          />
          <button
            className="bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-pink-600"
            onClick={addTag}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center border-1 border-gray-400 text-white rounded-lg px-3 py-1"
            >
              <span>{tag}</span>
              <button
                className="ml-2 text-white"
                onClick={() => removeTag(tag)}
              >
                <X size={16} color="white" />
              </button>
            </div>
          ))}
        </div>
        <button
          className={`${
            isAddLpDisabled ? "bg-gray-400" : "bg-pink-600"
          } text-white rounded-md px-4 py-2 w-full`}
          onClick={() => {
            if (!isAddLpDisabled) {
              submitLp();
              closeModal();
            }
          }}
          disabled={isAddLpDisabled}
        >
          Add LP
        </button>
      </div>
    </div>
  );
}
