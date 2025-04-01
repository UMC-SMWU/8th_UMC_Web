type PaginationProps = {
    totalResults: number;
    page: number;
    setPage: (page: number) => void;
};

const Pagination = ({ totalResults, page, setPage }: PaginationProps) => {
    const limit = 10;
    const numPages = Math.ceil(totalResults / limit); // 전체 페이지 개수

    return (
        <div className="flex justify-center space-x-4 mt-6 mb-6">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`w-10 h-10 rounded-full font-bold
                    ${page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-200 text-white"}`}
            >
                {"<"}
            </button>

            <div className="flex items-center justify-center w-10 h-10 font-bold text-2xl ">
                {page}
            </div>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === numPages}
                className={`w-10 h-10 rounded-full font-bold
                    ${page === numPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-200 text-white"}`}
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;