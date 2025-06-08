export const calculateFinalPrice = (
  price: string,
  discountPercentage: string
) => {
  const finalPrice = Number.parseFloat(price);
  const discount = Number.parseFloat(discountPercentage);

  if (finalPrice > 0 && discount > 0) {
    return finalPrice - (finalPrice * discount) / 100;
  }
  return finalPrice;
};
