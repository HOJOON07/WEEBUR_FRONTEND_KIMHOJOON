"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/Card";
import { RatingStars } from "@/components/RatingStars";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  layout: "grid" | "list";
}

export default function ProductCard({ product, layout }: ProductCardProps) {
  const { title, description, thumbnail, rating, reviews } = product;

  if (layout === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={thumbnail || "/placeholder.svg"}
                alt={title}
                width={120}
                height={120}
                className="rounded-lg object-cover w-[120px] h-[120px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <RatingStars rating={rating} />
                <span className="text-sm font-medium text-gray-900">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="mb-4">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            width={200}
            height={200}
            className="rounded-lg object-cover w-full h-48"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {description}
          </p>
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} />
              <span className="text-sm font-medium text-gray-900">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-500 mt-1">
              ({reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
