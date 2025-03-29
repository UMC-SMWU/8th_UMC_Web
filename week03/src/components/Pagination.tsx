import React from "react";

interface PageProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPage: number;
}

export default function Pagination({ page, setPage, totalPage }: PageProps) {
    return (
        <div className="flex items-center justify-center gap-6 mt-5">
            <button
                className="bg-[#f1a85a] text-white rounded-lg p-6 py-3
                shadow-md cursor-pointer hover:bg-[#de964995] transition-all duration-300
                disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={page===1}
                onClick={() => setPage((page) => page - 1)}
            >
                {`<`}
            </button>
            <span>{`${page} 페이지`}</span>
            <button 
                className="bg-[#97cdff] text-white rounded-lg p-6 py-3
                shadow-md cursor-pointer hover:bg-[#97cdff95] transition-all duration-300
                disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={page===totalPage} // totalPage가 엄청 큰 숫자이지만 그래도 설정
                onClick={() => setPage((page) => page + 1)}
            >
                {`>`}
            </button>
        </div>
    )
}