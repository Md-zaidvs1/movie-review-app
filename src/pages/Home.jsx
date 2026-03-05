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

  // Fetch movies whenever query OR page changes
  useEffect(() => {
    fetchMovies();
  }, [query, page]);

  const fetchMovies = async () => {
    const data = await searchMovies(query, page);

    if (data.Search) {
      setMovies(data.Search); // replace movies (important!)
    } else {
      setMovies([]);
    }
  };

  // Filter by year
  const filteredMovies = movies.filter((movie) => {
    if (!yearFilter) return true;
    return movie.Year === yearFilter;
  });

  return (
    
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue to-gray-800 px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
  🎬 Movie Review App
</h1>
      <SearchBar setQuery={setQuery} setPage={setPage} />

      {/* Year Filter */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Filter by Year (e.g. 2020)"
          className="border p-2 rounded"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-lg font-semibold text-yellow-700">Page {page}</span>

        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;