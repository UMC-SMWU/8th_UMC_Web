import { useState } from "react"
import { IoPerson } from "react-icons/io5";
import { PAGINATION_ORDER } from "../enums/common";
import { IoIosSettings } from "react-icons/io";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchMy from "../hooks/mutations/usePatchMy";
import { MdCheck } from "react-icons/md";

const MyPage = () => {
	const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
	const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
	const [name, setName] = useState(""); // 이름 상태
	const [bio, setBio] = useState(""); // bio 상태
	const [avatar, setAvatar] = useState<File | null>(null);
	
	const accessToken = localStorage.getItem("accessToken");
	const { data } = useGetMyInfo(accessToken);
	const { mutate } = usePatchMy();


	const handlePatch = () => {
		setIsEditing(true);
		setName(data?.data.name || "");
		setBio(data?.data.bio || "");
	};

	const handleSave = () => {
		const updatedInfo = {
			name: name,
			bio: bio || null,
			avatar: avatar || null,
		};

		mutate(updatedInfo, {
			onSuccess: () => {
				setIsEditing(false);
			    localStorage.setItem("myName", data?.data.name || "");

			}
		});
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
		  setAvatar(e.target.files[0]); // 선택된 파일 설정
		}
	};

    localStorage.setItem("myName", data?.data.name || "");

    return (
        <div className="flex flex-col items-center min-h-screen">
			<div className="flex items-center">
				<div className="flex items-center justify-center w-40 h-40 rounded-full bg-[#aed3fd] m-4">
					{isEditing ? (
						<label className="cursor-pointer">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleAvatarChange}
						/>
						{avatar ? (
							<img
							src={URL.createObjectURL(avatar)}
							alt="프로필 이미지"
							className="w-40 h-40 rounded-full object-cover"
							/>
						) : (
							<IoPerson className="text-white text-7xl" />
						)}
						</label>
					) : data?.data.avatar ? (
						<img
						src={data.data.avatar}
						alt="프로필 이미지"
						className="w-40 h-40 rounded-full"
						/>
					) : (
						<IoPerson className="text-white text-7xl" />
					)}
				</div>
				<div className="flex flex-col gap-1">
				{isEditing ? (
					<>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="이름을 입력하세요"
						/>
						<textarea
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="소개글을 입력하세요"
						/>
						</>
					) : (
						<>
						<div className="text-2xl">{data?.data.name}</div>
						<div className="text-md">{data?.data.bio || "안녕하세요"}</div>
						</>
					)}
					<div className="text-md font-bold">{data?.data.email}</div>
				</div>
				<button className="text-2xl ml-10" onClick={isEditing ? handleSave : handlePatch}>
					{isEditing ? <MdCheck /> : <IoIosSettings />}
				</button>
			</div>
			<div className="flex border border-gray-300 rounded overflow-hidden text-sm font-bold">
				<button
					className={`px-4 py-2 text-center w-30 ${
					order === PAGINATION_ORDER.asc
					? "bg-white text-black"
					: "bg-black text-white"
					}`}
					onClick={() => setOrder(PAGINATION_ORDER.asc)}
				>
					오래된 순
				</button>
				<button
					className={`px-4 py-2 text-center w-30 ${
					order === PAGINATION_ORDER.asc
						? "bg-black text-white"
						: "bg-white text-black"
					}`}
					onClick={() => setOrder(PAGINATION_ORDER.desc)}
				>
					최신순
				</button>
			</div>
        </div>
    )
}

export default MyPage
