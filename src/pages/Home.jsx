// pages/Home.jsx

import { useEffect, useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  // Fetch movies whenever parameters change
  useEffect(() => {
    fetchMovies();
  }, [query, page, yearFilter, typeFilter]);

  const fetchMovies = async () => {
    const data = await searchMovies(query, page, typeFilter, yearFilter);

    if (data.Search) {
      setMovies(data.Search); // replace movies
      setTotalResults(parseInt(data.totalResults, 10) || 0);
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  return (
    
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue to-gray-800 px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
  🎬 Movie Review App
</h1>
      <SearchBar setQuery={setQuery} setPage={setPage} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <input
          type="text"
          placeholder="Filter by Year (e.g. 2020)"
          className="border p-2 rounded flex-1 text-black"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border p-2 rounded flex-1 bg-white text-black"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No movies found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4 items-center">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-lg font-semibold text-yellow-500">
          Page {page} {totalResults > 0 && `of ${Math.ceil(totalResults / 10)}`}
        </span>

        <button
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
          disabled={page * 10 >= totalResults || totalResults === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
