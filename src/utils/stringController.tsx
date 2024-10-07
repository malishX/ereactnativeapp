export const getTotalPriceString = (string: string) => {
  return string.substring(0, string.length - 2);
};

export function isInt(n: number) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}
