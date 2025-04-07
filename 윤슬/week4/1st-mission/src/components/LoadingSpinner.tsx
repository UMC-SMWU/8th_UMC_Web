export const LoadingSpinner = () : React.ReactElement => {
    return (
    <div>
        <div className="size-12 animate-spin rounded-full border-6 border-t-transparent border-[#b2dab1]" role="status"></div>
        <span className="sr-only">로딩 중...</span>
    </div>
    );
}