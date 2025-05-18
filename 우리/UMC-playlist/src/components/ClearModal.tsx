interface ClearModalProps {
    onConfirm: () => void;
    onCancle: () => void;
}

const ClearModal = ({ onConfirm, onCancle }: ClearModalProps) => {
    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md z-20">
                <h1 className="text-xl font-bold mb-4">정말 삭제하시겠습니까?</h1>
                <div className="flex gap-5">
                    <button 
                        className=" flex-1 border p-4 rounded-md cursor-pointer"
                        onClick={onCancle}
                    >
                        아니요
                    </button>
                    <button 
                        className="flex-1 border p-4 rounded-md cursor-pointer bg-red-500 text-white"
                        onClick={onConfirm}
                    >
                        예
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClearModal
