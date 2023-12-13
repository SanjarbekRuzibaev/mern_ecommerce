export const calculateSizePrice = (size, actualPrice) => {
  let newSizePrice = actualPrice;
  if (size === "M") {
    newSizePrice = actualPrice * 1.1;
  } else if (size === "L") {
    newSizePrice = actualPrice * 1.15;
  } else if (size === "XL") {
    newSizePrice = actualPrice * 1.2;
  }
  return newSizePrice;
};
