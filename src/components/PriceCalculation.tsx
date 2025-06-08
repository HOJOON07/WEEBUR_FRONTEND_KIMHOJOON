interface PriceCalculationProps {
  price: string | number;
  discountPercentage?: string | number;
  finalPrice: number;
}

export function PriceCalculation({
  price,
  discountPercentage,
  finalPrice,
}: PriceCalculationProps) {
  const parsedPrice = Number(price);
  const parsedDiscount = Number(discountPercentage);

  if (isNaN(parsedPrice) || parsedPrice < 1000) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium text-gray-700 mb-2">Price Calculation</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Original Price:</span>
          <span>₩{parsedPrice.toLocaleString()}</span>
        </div>
        {discountPercentage && !isNaN(parsedDiscount) && parsedDiscount > 0 && (
          <>
            <div className="flex justify-between">
              <span>Discount ({discountPercentage}%):</span>
              <span className="text-red-500">
                -₩{((parsedPrice * parsedDiscount) / 100).toLocaleString()}
              </span>
            </div>
            <hr className="my-2" />
          </>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Final Price:</span>
          <span className="text-blue-600">₩{finalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
