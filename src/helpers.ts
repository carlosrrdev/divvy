export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function formatDecimal(num: number): number {
  return Math.round(num * 100) / 100;
}