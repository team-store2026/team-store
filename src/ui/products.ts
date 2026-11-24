import { products } from '../data/products';
import { createProductCard } from './product-card';

type SortOrder = 'default' | 'asc' | 'desc';

export function renderProducts(): HTMLElement {
  const productsSection = document.createElement('section');
  productsSection.className = 'products';

  const sectionHead = document.createElement('div');
  sectionHead.className = 'section-head';

  const headingContainer = document.createElement('div');

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Товар';

  const title = document.createElement('h2');
  title.className = 'section-head__title';
  title.textContent = 'Выбрать товар';

  const note = document.createElement('p');
  note.className = 'section-head__note';
  note.textContent =
    'Выбери то, что поднимает настроение — и добавь в корзину.';

  headingContainer.append(eyebrow, title);
  sectionHead.append(headingContainer, note);

  const controls = document.createElement('div');
  controls.className = 'products-controls';

  const categorySelect = document.createElement('select');
  categorySelect.className = 'products-controls__select';
  categorySelect.setAttribute('aria-label', 'Фильтр по категории');

  const allCategoriesOption = document.createElement('option');
  allCategoriesOption.value = 'all';
  allCategoriesOption.textContent = 'Все категории';
  categorySelect.append(allCategoriesOption);

  const categories = [...new Set(products.map((product) => product.category))];

  categories.sort((a, b) => a.localeCompare(b, 'ru'));

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });

  const sortSelect = document.createElement('select');
  sortSelect.className = 'products-controls__select';
  sortSelect.setAttribute('aria-label', 'Сортировка по цене');

  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'asc', label: 'Сначала дешевле' },
    { value: 'desc', label: 'Сначала дороже' },
  ];

  sortOptions.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    sortSelect.append(option);
  });

  controls.append(categorySelect, sortSelect);

  const grid = document.createElement('div');
  grid.className = 'products-grid';

  function updateProducts(): void {
    const selectedCategory = categorySelect.value;
    const sortOrder = sortSelect.value as SortOrder;

    let filteredProducts = products.filter((product) => {
      return (
        selectedCategory === 'all' ||
        product.category === selectedCategory
      );
    });

    if (sortOrder === 'asc') {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price,
      );
    }

    if (sortOrder === 'desc') {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price,
      );
    }

    grid.replaceChildren(
      ...filteredProducts.map((product) => createProductCard(product)),
    );
  }

  categorySelect.addEventListener('change', updateProducts);
  sortSelect.addEventListener('change', updateProducts);

  updateProducts();

  productsSection.append(sectionHead, controls, grid);

  return productsSection;
}
