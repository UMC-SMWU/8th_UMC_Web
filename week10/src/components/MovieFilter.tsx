import { memo, useState } from "react";
import { MovieFilters } from "../types/movie"
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import LanguageSelector from "./LanguageSelector";

interface MovieFilterProps {
    onChange : (filter: MovieFilters) => void;
}

const MovieFilter = ({onChange} : MovieFilterProps) => {
    const [query, setQuery] = useState<string>('');
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState('ko-KR');

    const handleSubmit = () => {
        const filters: MovieFilters = {
            query,
            include_adult: includeAdult,
            language,
        };
        console.log(filters);
        onChange(filters);
    };


    return (
        <div className="flex justify-center items-center">
        <div className="transform space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
            <div className="flex flex-wrap gap-6">
                <div className="min-w-[450px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">영화 제목</label>
                    <Input value={query} onChange={setQuery}/>
                </div>
                <div className="min-w-[250px] flex-1 items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">🐞옵션</label>
                    <SelectBox 
                        checked={includeAdult}
                        onChange={setIncludeAdult}
                        label="성인 콘텐츠 포함"
                        id="include-adult"
                        className="border border-gray-300 rounded-md p-4 rounded-md p-3 shadow-sm"
                    />
                </div>
                <div className="min-w-[250px] flex-1 items-center" >
                    <label className="block text-sm font-medium text-gray-700 mb-2">✅언어</label>
                    <LanguageSelector 
                        value={language}
                        onChange={setLanguage}
                        options={LANGUAGE_OPTIONS}
                        className="w-full"
                    />
                </div>
                <div className="w-full min-w-[450px] pt-4 cursor-pointer bg-blue-500 text-white font-bold border border-gray-300 rounded-md p-4 rounded-md p-3 shadow-sm hover:shadow-lg flex justify-center">
                    <button onClick={handleSubmit}>영화 검색</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default memo(MovieFilter)
