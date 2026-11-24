import type { Product } from '../data/products';

export type SortOrder = 'default' | 'asc' | 'desc';

export function getVisibleProducts(
  products: Product[],
  category: string,
  sortOrder: SortOrder,
): Product[] {
  let result = products.filter((product) => {
    return category === 'all' || product.category === category;
  });

  if (sortOrder === 'asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === 'desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}
