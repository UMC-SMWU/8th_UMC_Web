import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { axiosInstance } from "../apis/axios";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { mutate: updateMutate } = useUpdateMyInfo();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        setName(response.data.name);
        setBio(response.data.bio ?? "");
      } catch (err) {
        console.error("getMyInfo 에러:", err);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (!name.trim()) {
      alert("이름은 비워둘 수 없습니다.");
      return;
    }
    let imageUrl = data?.data.avatar;

    if (image) {
      const form = new FormData();
      form.append("file", image);
      const uploadRes = await axiosInstance.post("/v1/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl = uploadRes.data.data.imageUrl;
    }

    updateMutate(
      {
        name,
        bio,
        avatar: imageUrl ?? "",
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          window.location.reload();
        },
      }
    );
  };

  if (!data || !data.data) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center gap-6 bg-[#1e1e1e] p-10 rounded-md shadow-lg w-[350px]">
        <div className="relative w-full flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-white text-2xl focus:outline-none px-3"
          >
            &lt;
          </button>
          <h1 className="text-3xl font-bold text-center w-full">마이페이지</h1>
        </div>

        <label htmlFor="avatar-upload" className="cursor-pointer">
          <img
            src={data.data.avatar || profile}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full border border-gray-400 object-cover"
          />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="hidden"
        />

        <div className="text-center w-full">
          {isEditing ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-semibold mb-1 text-center bg-zinc-800 rounded px-2 w-full"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-gray-400 text-sm text-center bg-zinc-800 rounded px-2 mt-1 w-full"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-1">{name}</h2>
              <p className="text-gray-400 text-sm">{bio}</p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-6 w-full">
          <button
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-md text-white font-medium"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium"
            onClick={handleUpdate}
          >
            {isEditing ? "저장" : "회원 정보 수정"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
