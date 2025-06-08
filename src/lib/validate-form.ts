type ProductFormField =
  | "title"
  | "description"
  | "price"
  | "discountPercentage"
  | "brand";

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  discountPercentage?: string;
  brand: "Apple" | "Samsung" | "Weebur" | "";
}

type ProductFormErrors = Partial<Record<ProductFormField, string>>;

export function validateProductForm(
  formData: ProductFormData
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  // Title
  if (!formData.title.trim()) {
    errors.title = "Title is required.";
  } else if (formData.title.length > 15) {
    errors.title = "Title must be 15 characters or fewer.";
  }

  // Price

  const price = Number(formData.price);
  if (!formData.price || isNaN(price)) {
    errors.price = "Price is required.";
  } else if (price < 1000) {
    errors.price = "Price must be at least 1,000.";
  }

  // DiscountPercentage (optional)
  if (
    formData.discountPercentage !== undefined &&
    formData.discountPercentage !== ""
  ) {
    const discount = Number(formData.discountPercentage);
    if (isNaN(discount) || discount > 100) {
      errors.discountPercentage = "Discount percentage must be 100 or less.";
    }
  }
  // Brand
  if (!formData.brand) {
    errors.brand = "Brand is required.";
  } else if (
    formData.brand !== "Apple" &&
    formData.brand !== "Samsung" &&
    formData.brand !== "Weebur"
  ) {
    errors.brand = "Invalid brand.";
  }

  return errors;
}
