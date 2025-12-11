export const validatePriceInput = (inputValue: string) => {
  const priceRegex = /^\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?$/;
  return priceRegex.test(inputValue);
};
