import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { RootState } from '../store/store';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-gray-100 text-gray-800"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
