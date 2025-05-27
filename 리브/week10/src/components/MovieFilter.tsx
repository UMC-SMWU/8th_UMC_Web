import { memo, useMemo, useState } from "react";
import { Input } from "../components/Input";
import { SelectBox } from "../components/SelectBox";
import LanguageSelector from "./LanguageSelector";
import { MovieFilters, MovieLanguage } from "../types/movie";

interface MovieFilterProps {
  onChange: (filters: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  // useMemo로 filters 객체 메모이제이션
  const filters = useMemo(
    () => ({
      query,
      include_adult: includeAdult,
      language,
    }),
    [query, includeAdult, language]
  );

  const handleSubmit = () => {
    onChange(filters);
  };

  return (
    <div className="space-y-4">
      {/* 첫 번째 줄: 제목 & 옵션 */}
      <div className="flex justify-between">
        <div className="flex flex-col flex-1 mr-4">
          <label className="flex items-center gap-2 font-medium text-sm text-gray-700 mb-1">
            <span>🎬 영화 제목</span>
          </label>
          <Input value={query} onChange={setQuery} placeholder="영화 제목을 입력하세요" />
        </div>
        <div className="flex flex-col flex-1 ml-4">
          <label className="flex items-center gap-2 font-medium text-sm text-gray-700 mb-1">
            <span>⚙️ 옵션</span>
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
          />
        </div>
      </div>

      {/* 두 번째 줄: 언어 선택 */}
      <div>
        <label className="flex items-center gap-1 font-medium text-sm text-gray-700 mb-1">
          <span>🌐 언어</span>
        </label>
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          options={[
            { value: "ko-KR", label: "한국어" },
            { value: "en-US", label: "영어" },
            { value: "ja-JP", label: "일본어" },
          ]}
        />
      </div>

      {/* 버튼 */}
      <div>
        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-500 py-2 text-white font-semibold hover:bg-blue-600 transition"
        >
          🔍 검색하기
        </button>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
