import { useEffect, useState } from "react"
import { IoClose, IoPerson } from "react-icons/io5";
import { PAGINATION_ORDER } from "../enums/common";
import { IoIosSettings } from "react-icons/io";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchMy from "../hooks/mutations/usePatchMy";
import { MdAddBox, MdCheck } from "react-icons/md";
import useGetMyLpList from "../hooks/queries/useGetMyLpList";
import LpCard from "../components/LpCard/LpCard";
import { useNavigate } from "react-router-dom";
import { usePostLp } from "../hooks/mutations/useLpDetail";
import { Tag } from "../types/lp";

const MyPage = () => {
	const navigate = useNavigate();
	const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
	const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
	const [name, setName] = useState(""); // 이름 상태
	const [bio, setBio] = useState(""); // bio 상태
	const [avatar, setAvatar] = useState<File | null>(null);
	
	const accessToken = localStorage.getItem("accessToken");
	const { data } = useGetMyInfo(accessToken);
	const { mutate: postLp} = usePostLp();
	const [thumbnail, setThumbnail] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState<Tag[]>([]);
    const [newTag, setNewTag] = useState(""); 
	const { mutate } = usePatchMy();

	const { data: lps } = useGetMyLpList({
		order,
	});

	const handleCardClick = (lpId: number) => {
    	navigate(`/lp/${lpId}`);
  	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const isFormValid = title.trim() && content.trim() && thumbnail.trim() && tags.length > 0;

	const handleDeleteTag = (tagId: number) => {
      setTags(tags.filter((tag) => tag.id !== tagId));
    };

    const handleAddTag = () => {
      if (!newTag.trim()) return;
      setTags([...tags, { id: Date.now(), name: newTag }]); // 임시 ID 생성
      setNewTag("");
    };

	useEffect(() => {
		if (tags) {
		setTags(tags);
		}
	}, [tags]);

	const handlePostLp = () => {
		postLp({
			title,
			content,
			tags: tags.map((tag) => tag.name),
			thumbnail,
			published: true,
		});
		setIsModalOpen(false);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

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
		<>
		<div className={`flex justify-center min-h-screen transition-opacity duration-300 ${isModalOpen ? "opacity-50" : "opacity-100"}`}>
			<div className="flex flex-col items-center w-4/5">
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
					<button
					className="text-2xl ml-10"
					onClick={isEditing ? handleSave : handlePatch}
					>
					{isEditing ? <MdCheck /> : <IoIosSettings />}
					</button>
				</div>
				{/* page order button */}
				<div className="w-full flex justify-between mt-4">
					<button className="text-2xl" onClick={() => setIsModalOpen(true)}>
						<MdAddBox />
					</button>
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
				<div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
					{lps?.data.map((lp) => (
						<div key={lp.id} className="">
							<LpCard key={lp.id} lp={lp} onClick={handleCardClick} />
						</div>
					))}
				</div>
			</div>
		</div>

		{/* lpPost 모달창 */}
		{isModalOpen && (
			<div 
				className="flex fixed inset-0 items-center justify-center"
				onClick={handleCloseModal}
			>
				<div 
					className="flex flex-col gap-3 bg-neutral-800 text-white p-6 rounded-xl shadow-lg w-full max-w-sm relative"
					onClick={(e) => e.stopPropagation()}	
				>
					<button className="flex justify-end text-2xl" onClick={handleCloseModal}>
						<IoClose />
					</button>
					<img src="https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U=" />
					<input
						type="text"
						value={title}
						placeholder="LP Name"
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
					/>
					<input
						type="text"
						value={content}
						placeholder="LP Content"
						onChange={(e) => setContent(e.target.value)}
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
					/>
					<input
						type="text"
						value={thumbnail}
						placeholder="LP image URL"
						onChange={(e) => setThumbnail(e.target.value)}
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
					/>
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							placeholder="태그를 입력하세요"
							className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							className="px-2 py-1 bg-gray-400 text-white rounded"
							onClick={handleAddTag}
						>
							추가
						</button>
					</div>
					<div className="flex flex-wrap gap-2 mt-4">
						{tags.map((tag) => (
							<span
								key={tag.id}
								className="px-3 py-1 border border-gray-200 text-gray-300 rounded-2xl text-sm"
							>
								# {tag.name}
								<button
									className="m-1 text-red-500 hover:text-red-700"
									onClick={() => handleDeleteTag(tag.id)}
								>
									X
								</button>
							</span>
						))}
					</div>
					<button
						className={`mt-4 px-4 py-2 rounded ${
							isFormValid
							? "bg-blue-500 text-white hover:bg-blue-600"
							: "bg-gray-400 text-gray-200 cursor-not-allowed"
						}`}
						onClick={handlePostLp}
						disabled={!isFormValid} // 모든 필드가 채워지지 않으면 비활성화
					>
						Add Lp
					</button>
				</div>
			</div>
		)}
		</>
	);
}

export default MyPage
