"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calculateFinalPrice } from "@/lib/calculate-final-price";
import { validateProductForm } from "@/lib/validate-form";
import { FormField } from "./FormField";
import { PriceCalculation } from "./PriceCalculation";

const INIT_FORM = {
  title: "",
  description: "",
  price: "",
  discountPercentage: "",
  brand: "" as "Apple" | "Samsung" | "Weebur" | "",
};

export default function AddNewProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(INIT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalPrice = calculateFinalPrice(
    formData.price,
    formData.discountPercentage
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      router.push("/products");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Product Title"
              id="title"
              required
              input={
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter product title (max 15 characters)"
                  maxLength={15}
                />
              }
              errorText={errors.title}
              helpText={`${formData.title.length}/15 characters`}
            />

            <FormField
              label="Description"
              id="description"
              input={
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description (optional)"
                />
              }
            />
            <FormField
              label="Price"
              id="price"
              required
              input={
                <input
                  id="price"
                  type="number"
                  min="1000"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter price (minimum 1,000)"
                />
              }
              errorText={errors.price}
            />

            <FormField
              label="Discount Percentage"
              id="discountPercentage"
              input={
                <input
                  id="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    handleChange("discountPercentage", e.target.value)
                  }
                  className={`w-full p-3 border rounded-md ${
                    errors.discountPercentage
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter discount percentage (0-100)"
                />
              }
              errorText={errors.discountPercentage}
            />

            <FormField
              label="Brand"
              id="brand"
              required
              input={
                <select
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Weebur">Weebur</option>
                </select>
              }
              errorText={errors.brand}
            />

            <PriceCalculation
              price={formData.price}
              discountPercentage={formData.discountPercentage}
              finalPrice={finalPrice}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8"
                variant="outline"
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
