export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function nearestHundredth(number: number) {
  return Math.round(number * 100) / 100;
}