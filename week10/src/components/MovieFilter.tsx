import type { MovieFilters, MovieLanguage } from "../types/movie.ts";
import { memo, useState } from "react";
import TextInput from "./TextInput.tsx";
import CheckBox from "./CheckBox.tsx";
import SelectBox from "./SelectBox.tsx";
import { LANGUAGE_OPTIONS } from "../constants/movie.ts";
import Label from "./Label.tsx";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-6 flex flex-col space-y-4">
      {/* 첫 줄: 제목 입력과 옵션 */}
      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 flex flex-col space-y-2`}>
          <Label id={`title`} label={`🎬 영화 제목`} />
          <TextInput
            id={`title`}
            onChange={setQuery}
            value={query}
            placeholder="영화 제목을 입력하세요"
          />
        </div>

        <div className={`flex-1 flex flex-col space-y-2`}>
          <Label id={`option`} label={`⚙️ 옵션`} />
          <CheckBox
            id={`adult`}
            checked={includeAdult}
            label={`성인 콘텐츠 표시`}
            onChange={setIncludeAdult}
          />
        </div>
      </div>

      {/* 언어 선택 */}
      <div className="flex flex-col space-y-2">
        <Label id={`language`} label={`🌐 언어`} />
        <SelectBox
          id={`language`}
          options={LANGUAGE_OPTIONS}
          value={language}
          onChange={setLanguage}
        />
      </div>

      {/* 검색 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all"
      >
        🔍 검색하기
      </button>
    </div>
  );
};

export default memo(MovieFilter);
