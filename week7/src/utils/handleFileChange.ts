import { ChangeEvent } from "react";

export const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (result: string) => void,
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        callback(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
};
