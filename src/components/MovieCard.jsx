import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300"
        }
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />

      <h3 className="text-lg font-bold mt-2">{movie.Title}</h3>
      <p>{movie.Year}</p>

      {/* ⭐ Star Rating */}
      <StarRating movieId={movie.imdbID} />

      <Link
        to={`/movie/${movie.imdbID}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;