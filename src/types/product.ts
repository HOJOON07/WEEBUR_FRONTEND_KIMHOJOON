export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  brand: "Apple" | "Samsung" | "Weebur";
  thumbnail?: string;
  rating?: number;
  reviewsCount?: number;
}
