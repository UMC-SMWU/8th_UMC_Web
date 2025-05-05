const CommentInput = () => {
    return (
      <div className="mt-4 border rounded-md border-gray-600 p-4 bg-[#1f1f1f]">
        <textarea
          className="w-full bg-transparent text-sm text-white resize-none focus:outline-none"
          rows={3}
          placeholder="댓글을 입력하세요 (기능은 비활성화 상태입니다)"
          disabled
        />
        <button className="mt-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-50 cursor-not-allowed">
          등록
        </button>
      </div>
    );
  };
  
  export default CommentInput;
  