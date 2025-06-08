import ProductList from "@/components/ProductList";
import ProductListHeader from "@/components/ProductListHeader";
import { getCookie } from "@/lib/get-cookie";

export default async function ProductPage() {
  const viewMode = await getCookie(
    "view-mode",
    ["grid", "list"] as const,
    "grid"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductListHeader />
      <ProductList layout={viewMode} />
    </div>
  );
}
