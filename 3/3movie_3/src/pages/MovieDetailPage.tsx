import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movie";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import axios from "axios";

export default function MovieDetailPage() {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  useEffect((): void => {
    const fetchMovieDetail = async () => {
      if (!movieId) return;

      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending || !movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  console.log(movie);

  return (
    <div className="p-10">
      <div className="flex flex-col items-center md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.overview}</p>
          <p>
            <strong>Release Date :</strong> {movie.release_date}
          </p>
          <p>
            <strong>Vote Average :</strong> {movie.vote_average}/10
          </p>
          <p>
            <strong>Language :</strong> {movie.original_language.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
