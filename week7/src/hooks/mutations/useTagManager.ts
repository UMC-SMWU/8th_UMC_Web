import { useState } from "react";

export default function useTagManager(initialTags: string[] = []) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return {
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    setInitialTags: setTags, // 초기값 세팅을 위한 메서드
  };
}
