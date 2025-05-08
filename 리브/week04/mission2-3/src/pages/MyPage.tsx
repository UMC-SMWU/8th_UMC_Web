import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUpdateMyInfo } from "../hooks/mutations/useUpdateMyInfo";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data, isLoading } = useGetMyInfo();
  const { mutate: updateMyInfo } = useUpdateMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const user = data?.data;

  // 첫 로딩 시 초기값 세팅
  useState(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
      setAvatar(user.avatar || "");
    }
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("닉네임은 비워둘 수 없습니다.");
      return;
    }

    updateMyInfo(
      { name, bio, avatar },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  if (isLoading || !user) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={avatar || "/default-profile.png"}
          alt="프로필 이미지"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div className="text-lg">{user.email}</div>

        {isEditing ? (
          <>
            <input
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white w-72 text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임"
            />
            <input
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white w-72 text-center"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개 (선택)"
            />
            <input
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white w-72 text-center"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="프로필 이미지 URL (선택)"
            />
            <div className="flex gap-4 mt-2">
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-bold"
                onClick={handleSubmit}
              >
                저장
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.name);
                  setBio(user.bio || "");
                  setAvatar(user.avatar || "");
                }}
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{user.name}</div>
            <p className="text-sm text-gray-400">{user.bio}</p>
            <button
              className="px-4 py-2 mt-2 border border-white rounded hover:bg-white hover:text-black transition"
              onClick={() => setIsEditing(true)}
            >
              설정
            </button>
          </>
        )}

        <button
          className="mt-6 px-6 py-2 bg-pink-500 hover:bg-pink-700 rounded-md text-white font-semibold"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;

