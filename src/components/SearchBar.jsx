// components/SearchBar.jsx

import { useState } from "react";

const SearchBar = ({ setQuery, setPage }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setQuery(input);
    setPage(1); // reset page when new search
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search movies..."
        className="border p-2 w-full rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;