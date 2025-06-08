"use client";
import ProductCard from "@/components/ProductCard";
import { useInfiniteProducts } from "@/hooks/use-infinite-products";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCallback, useEffect, useRef } from "react";

type LayoutType = "grid" | "list";

interface ProductListProps {
  layout: LayoutType;
}

export default function ProductList({ layout }: ProductListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteProducts();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const { entry } = useIntersectionObserver(observerRef, {});
  const isPageEnd = !!entry?.isIntersecting;

  const fetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNext();
    }
  }, [isPageEnd, hasNextPage, fetchNext]);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  if (status === "error") {
    return <div className="text-red-500">상품을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} layout={layout} />
        ))}
      </div>
      <div className="mb-10 h-10 w-full touch-none" ref={observerRef} />
      {isFetchingNextPage && (
        <div className="py-4 text-center">Loading more products...</div>
      )}
    </>
  );
}
