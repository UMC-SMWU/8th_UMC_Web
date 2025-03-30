import { MovieCrew } from "../types/movie";

interface CrewCardProps {
    crew: MovieCrew;
}

export default function CrewCard({ crew }: CrewCardProps) { 
    return (
        <>
            <div key={crew.id}>
                <div>{`이름 : ${crew.name}`}</div>
                <div>{`배역 : ${crew.job}`}</div>
            </div>
        </>
    )
}
