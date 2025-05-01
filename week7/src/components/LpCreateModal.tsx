import { X } from "lucide-react";
import img_lp_black from "../assets/img_lp_black.png";

export default function LpCreateModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
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
        <img
          src={img_lp_black}
          alt="LP Thumbnail"
          className="size-70 mx-auto mb-4"
        />
        <input
          type="text"
          placeholder="LP Name"
          className="border border-gray-300 text-white rounded-md p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="LP Content"
          className="border border-gray-300 text-white rounded-md p-2 mb-4 w-full"
        />
        <div className="flex justify-between gap-2 mb-8">
          <input
            type="text"
            placeholder="LP Tag"
            className="border border-gray-300 text-white rounded-md p-2 w-full"
          />
          <button className="bg-gray-400 text-white rounded-md px-4 py-2">
            Add
          </button>
        </div>

        <button
          className="bg-gray-400 text-white rounded-md px-4 py-2 w-full"
          onClick={closeModal}
        >
          Add LP
        </button>
      </div>
    </div>
  );
}
