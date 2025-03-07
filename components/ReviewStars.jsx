import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (starValue <= Math.floor(rating)) {
      return <FaStar key={index} className="text-yellow-400" />;
    }

    if (starValue === Math.ceil(rating) && rating % 1 !== 0) {
      return <FaStarHalfAlt key={index} className="text-yellow-400" />;
    }

    return <FaRegStar key={index} className="text-yellow-400" />;
  });

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="text-gray-600 ml-2">({rating.toFixed(1)})</span>
    </div>
  );
};

export default ReviewStars;