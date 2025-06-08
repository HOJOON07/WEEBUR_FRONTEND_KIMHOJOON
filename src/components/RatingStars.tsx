import { Star } from "lucide-react";
import React, { useMemo } from "react";

function HalfStar({ className }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      <Star className="w-4 h-4 text-gray-300" />
      <div className="absolute inset-0 overflow-hidden w-1/2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      </div>
    </div>
  );
}

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export function RatingStars({ rating, className }: RatingStarsProps) {
  const stars = useMemo(() => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starsArr: React.ReactNode[] = [];

    for (let i = 0; i < fullStars; i++) {
      starsArr.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      starsArr.push(<HalfStar key="half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starsArr.push(
        <Star
          key={fullStars + (hasHalfStar ? 1 : 0) + i}
          className="w-4 h-4 text-gray-300"
        />
      );
    }
    return starsArr;
  }, [rating]);

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>{stars}</div>
  );
}
