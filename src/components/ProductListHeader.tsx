import { Button } from "@/components/Button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function ProductListHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Product Page</h1>
      </div>
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/products/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
