import { getProducts } from "@/lib/get-products";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getProducts({ skip: pageParam });
      if (!data) throw new Error("데이터를 불러오지 못했습니다.");
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { skip, total, limit } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
  });
};
