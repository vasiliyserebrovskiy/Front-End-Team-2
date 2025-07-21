export function formatPrice(price: number): string {
  return `${Math.round(price / 30)}`;
}