import { useParams } from "react-router-dom"

const MoviePage = () => {
    const params = useParams();

    return (
        <h1>{params.movieId}번의 MoviePage</h1>
    )
}

export default MoviePage