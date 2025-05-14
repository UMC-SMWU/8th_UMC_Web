import React, { ChangeEvent } from "react";

interface ThumbnailInputProps {
  thumbnail: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imgClassName?: string;
}

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  thumbnail,
  onChange,
  imgClassName = "size-70 mx-auto mb-4 rounded-full",
}) => {
  return (
    <>
      <label htmlFor="thumbnail-input" className="cursor-pointer">
        <img src={thumbnail} alt="LP Thumbnail" className={imgClassName} />
      </label>
      <input
        id="thumbnail-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </>
  );
};

export default ThumbnailInput;
