// src/hooks/useMovieDetails.ts
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export const useMovieDetails = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);

      try {
        const [movieRes, castRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR&api_key=${API_KEY}`
          ),
        ]);

        setMovie(movieRes.data);
        setCast(castRes.data.cast?.slice(0, 10) || []);
      } catch (err) {
        setError("영화 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return { movie, cast, loading, error };
};