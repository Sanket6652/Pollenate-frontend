import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

interface LikeStarRatingProps {
  maxRating?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<LikeStarRatingProps> = ({ maxRating = 5, onChange }) => {
  const [rating, setRating] = useState(0);


  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            className={`text-3xl focus:outline-none transition-colors duration-200`}
            onClick={() => handleRatingChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            { ratingValue <= (hover || rating)  ? <FaStar color='yellow' /> : <CiStar/>}
            
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
