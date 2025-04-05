import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetail } from "../types/movie";

export default function MovieDetailPage() {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`;

  const {
    isPending,
    isError,
    data: movie,
  } = useCustomFetch<MovieDetail>(url, "ko-KR");

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
