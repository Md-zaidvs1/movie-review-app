import { useState, useEffect } from "react";

const StarRating = ({ movieId }) => {
  const [rating, setRating] = useState(0);

  // Load saved rating from localStorage
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    if (savedRatings[movieId]) {
      setRating(savedRatings[movieId]);
    }
  }, [movieId]);

  // Handle rating click
  const handleRating = (value) => {
    setRating(value);

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    savedRatings[movieId] = value;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  };

  return (
    <div className="mt-2">
      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Show Rating Text Once */}
      <p className="text-sm text-gray-600 mt-1">
        Your Rating: {rating > 0 ? rating : "Not rated"}
      </p>
    </div>
  );
};

export default StarRating;