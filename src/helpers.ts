export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function formatDecimal(num: number): number {
  return Math.round(num * 100) / 100;
}

export const chartColors = [
  "#FF6F61",
  "#6B9080",
  "#F4A259",
  "#86B3D1",
  "#B56576",
  "#FFCB77",
  "#8DAA9D",
  "#D78296",
  "#736372",
  "#E8A87C",
]