// services/api.js

const API_KEY = "688cb5f7"; // replace with your key
const BASE_URL = "https://www.omdbapi.com/";

// Function to search movies with pagination
export const searchMovies = async (query, page = 1, type = "", year = "") => {
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
  if (type) url += `&type=${type}`;
  if (year) url += `&y=${year}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Function to get full movie details
export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await response.json();
  return data;
};
