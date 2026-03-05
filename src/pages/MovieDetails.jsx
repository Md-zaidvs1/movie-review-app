import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import StarRating from "../components/StarRating";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl max-w-5xl w-full p-6 grid md:grid-cols-2 gap-8">

        {/* Poster */}
        <div className="flex justify-center">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400"
            }
            alt={movie.Title}
            className="rounded-lg shadow-lg w-80 object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Genre:</span> {movie.Genre}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Released:</span> {movie.Released}
          </p>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Cast:</span> {movie.Actors}
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            {movie.Plot}
          </p>

          {/* ⭐ Rating */}
          <StarRating movieId={movie.imdbID} />
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;