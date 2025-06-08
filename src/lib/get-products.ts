import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts({
  skip = 0,
  limit = 20,
}: {
  skip?: number;
  limit?: number;
} = {}): Promise<GetProductsResponse | null> {
  try {
    const res = await axios.get<GetProductsResponse>(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
    return null;
  }
}
