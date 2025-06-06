import { X } from "lucide-react";
import img_lp_black from "../assets/img_lp_black.png";
import { useState } from "react";
import { useLps } from "../hooks/mutations/useLps.ts";
import useTagManager from "../hooks/mutations/useTagManager.ts";
import { handleFileChange } from "../utils/handleFileChange.ts";
import TextInput from "./TextInput.tsx";
import EditTagItem from "./EditTagItem.tsx";
import ThumbnailInput from "./ThumbnailInput.tsx";

export default function LpCreateModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [thumbnail, setThumbnail] = useState<string>(img_lp_black);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { tags, tagInput, setTagInput, addTag, removeTag } = useTagManager();
  const { mutate } = useLps();

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
      {/*모달창을 감싸는 컨테이너*/}
      <div
        className="bg-[#3e3f43] p-6 rounded-lg shadow-lg w-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="flex ml-auto" onClick={closeModal}>
          <X size={20} color="white" />
        </button>
        <ThumbnailInput
          onChange={(e) => handleFileChange(e, setThumbnail)}
          thumbnail={thumbnail}
          imgClassName={`size-70 rounded-full mb-4 mx-auto`}
        />
        <TextInput
          onChange={(e) => setName(e.target.value)}
          placeholder={"LP Name"}
          type={"text"}
          value={name}
          className={`w-full mb-4`}
        />
        <TextInput
          onChange={(e) => setContent(e.target.value)}
          placeholder={"LP Content"}
          type={"text"}
          value={content}
          className={`w-full mb-4`}
        />
        <div className="flex gap-2 mb-4 items-center">
          <TextInput
            onChange={(e) => setTagInput(e.target.value)}
            placeholder={"LP Tag"}
            type={"text"}
            value={tagInput}
            className={`w-full`}
          />
          <button
            className="bg-gray-400 text-white rounded-md p-2 hover:bg-pink-600"
            onClick={addTag}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <EditTagItem key={tag} tag={tag} onRemove={removeTag} />
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
