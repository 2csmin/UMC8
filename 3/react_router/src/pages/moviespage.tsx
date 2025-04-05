import { Movie, MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";

import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer 토큰값`,
          },
        }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
