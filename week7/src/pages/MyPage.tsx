import { useEffect, useState } from "react";
import { getMyInfo } from "../api/AuthService";
import { ResponseMyInfoDto } from "../types/auth";
import img_profile from "../assets/ic_signup_profile.svg";
import { useAuthContext } from "../context/AuthContext";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { usePatchUser } from "../hooks/mutations/useUser.ts";

export default function MyPage() {
  const [data, setData] = useState<ResponseMyInfoDto>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState(data?.data?.name || "");
  const [bio, setBio] = useState(data?.data?.bio || "");
  const [avatar, setAvatar] = useState(data?.data?.avatar || img_profile);
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem(LOCAL_STORAGE_KEY.nickname);
  };

  const { mutate: patchMyInfo } = usePatchUser();
  const handleUpdate = () => {
    const data = {
      name: nickname,
      bio: bio,
      avatar: avatar,
    };
    patchMyInfo(data);
    setIsEditMode(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
      setNickname(response.data.name || "");
      setBio(response.data.bio || "");
      setAvatar(response.data.avatar || img_profile);
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, response.data.name);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 text-white items-center mt-20">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <img
            src={avatar}
            alt="프로필 이미지"
            className="size-50 mb-10 rounded-full"
          />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span>이메일: {data?.data?.email}</span>
        {isEditMode ? (
          <>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="border border-gray-300 text-white rounded-md p-2 mb-4"
            />
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="소개글을 입력해주세요"
              className="border border-gray-300 text-white rounded-md p-2 mb-4"
            />
          </>
        ) : (
          <>
            <span>이름: {nickname}</span>
            <span>소개: {bio ? bio : "없음"}</span>
          </>
        )}
        <div className={`flex justify-center gap-4 items-center text-white`}>
          {isEditMode ? (
            <button
              className={`text-white font-bold py-2 px-4 rounded mt-10 border-1 border-gray-300`}
              onClick={handleUpdate}
            >
              수정
            </button>
          ) : (
            <>
              <button
                className="text-white font-bold py-2 px-4 rounded mt-10 border-1 border-gray-300"
                onClick={() => setIsEditMode(true)}
              >
                프로필 수정
              </button>
              <button
                className="text-white font-bold py-2 px-4 rounded mt-10 border-1 border-gray-300"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
