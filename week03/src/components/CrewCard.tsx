import { MovieCrew } from "../types/movie";

interface CrewCardProps {
    crew: MovieCrew;
}

export default function CrewCard({ crew }: CrewCardProps) { 
    return (
        <>
            <div className="flex flex-col justify-center items-center" key={crew.id}>
                <div className="">{crew.name}</div>
                <div className="text-sm text-gray-400">{crew.job}</div>
            </div>
        </>
    )
}
