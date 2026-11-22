import {
  getCartFromStorage,
  calculateCartTotals,
  formatPrice,
  getProductQuantity,
  updateCartQuantity,
} from '../data/cart';
import { products } from '../data/products';
import { removeIcon } from '../utils/svg';

export function renderCartContents(): HTMLElement {
  const cart = getCartFromStorage();

  const section = document.createElement('section');
  section.className = 'cart';

  // — Section head —
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
  note.textContent = 'Выбери то, что поднимает настроение — и добавь в корзину.';

  headingContainer.append(eyebrow, title);
  sectionHead.append(headingContainer, note);
  section.append(sectionHead);

  // — Body —
  if (cart.items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Корзина пуста';
    section.append(empty);

    const summary = document.createElement('div');
    summary.className = 'cart-summary cart-summary--empty';
    const totalSpan = document.createElement('span');
    totalSpan.className = 'cart-summary__total';
    totalSpan.innerHTML = `Итого: <strong>${formatPrice(0)}</strong>`;
    summary.append(totalSpan);
    section.append(summary);
  } else {
    const body = document.createElement('div');
    body.className = 'cart-body';

    const list = document.createElement('div');
    list.className = 'cart-list';

    const footer = document.createElement('div');
    footer.className = 'cart-footer';

    const summary = document.createElement('div');
    summary.className = 'cart-summary';

    const promoRow = document.createElement('div');
    promoRow.className = 'cart-promo';

    function renderFooter(): void {
      const cart = getCartFromStorage();
      const {
        subtotal: cartSubtotal,
        discount: cartDiscount,
        total: cartTotal,
      } = calculateCartTotals(cart, products);

      const totalQuantity = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      const promoStatus = cart.promoCode
        ? `Промоко ${cart.promoCode} применён (−${cart.discount}%)`
        : 'Промокод не выбран';

      summary.replaceChildren();

      // Row: quantity + subtotal
      const row1 = document.createElement('div');
      row1.className = 'cart-summary__row';
      const label1 = document.createElement('span');
      label1.className = 'cart-summary__label';
      label1.textContent = `Выбрано товаров: ${totalQuantity} шт.`;
      const value1 = document.createElement('span');
      value1.className = 'cart-summary__value';
      value1.textContent = formatPrice(cartSubtotal);
      row1.append(label1, value1);
      summary.append(row1);

      // Row: discount (if any)
      if (cartDiscount > 0) {
        const rowDiscount = document.createElement('div');
        rowDiscount.className = 'cart-summary__row';
        const labelDiscount = document.createElement('span');
        labelDiscount.className = 'cart-summary__label';
        labelDiscount.textContent = `Скидка по коду ${cart.promoCode} (${cart.discount}%)`;
        const valueDiscount = document.createElement('span');
        valueDiscount.className = 'cart-summary__value';
        valueDiscount.textContent = `−${formatPrice(cartDiscount)}`;
        rowDiscount.append(labelDiscount, valueDiscount);
        summary.append(rowDiscount);
      }

      // Row: total
      const rowTotal = document.createElement('div');
      rowTotal.className = 'cart-summary__row cart-summary__row--total';
      const labelTotal = document.createElement('span');
      labelTotal.className = 'cart-summary__label';
      labelTotal.textContent = 'Итого к оплате';
      const valueTotal = document.createElement('span');
      valueTotal.className = 'cart-summary__value';
      valueTotal.textContent = formatPrice(cartTotal);
      rowTotal.append(labelTotal, valueTotal);
      summary.append(rowTotal);

      promoRow.replaceChildren();

      const form = document.createElement('div');
      form.className = 'cart-promo__form';

      const group = document.createElement('span');
      group.className = 'cart-promo__group';

      const input = document.createElement('input');
      input.className = 'cart-promo__input';
      input.type = 'text';
      input.placeholder = 'Промокод:';
      input.setAttribute('aria-label', 'Промокод');

      const applyBtn = document.createElement('button');
      applyBtn.type = 'button';
      applyBtn.className = 'button cart-promo__button';
      applyBtn.dataset.action = 'apply-promo';
      applyBtn.textContent = 'Применить';

      group.append(input, applyBtn);

      if (cart.items.length > 0) {
        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'button cart-summary__button';
        checkoutBtn.dataset.action = 'checkout';
        checkoutBtn.textContent = 'Оформить заказ';
        form.append(group, checkoutBtn);
      } else {
        form.append(group);
      }

      const status = document.createElement('p');
      status.className = 'cart-promo__status';
      status.dataset.promoStatus = '';
      status.textContent = promoStatus;

      promoRow.append(form, status);
    }

    cart.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const { id: productId, price: productPrice } = product;

      const row = document.createElement('article');
      row.className = 'cart-row';

      // image
      const img = document.createElement('img');
      img.className = 'cart-row__image';
      img.src = product.image;
      img.alt = product.name;
      img.loading = 'lazy';
      row.append(img);

      // info
      const info = document.createElement('div');
      info.className = 'cart-row__info';

      const name = document.createElement('h3');
      name.className = 'cart-row__name';
      name.textContent = product.name;

      const metaCategory = document.createElement('p');
      metaCategory.className = 'cart-row__meta';
      metaCategory.innerHTML = `Категория: <span>${product.category}</span>`;

      const metaStock = document.createElement('p');
      metaStock.className = 'cart-row__meta';
      metaStock.textContent = 'Наличие: в наличии';

      const price = document.createElement('p');
      price.className = 'cart-row__price';
      price.textContent = formatPrice(productPrice);

      info.append(name, metaCategory, metaStock, price);
      row.append(info);

      // total
      const totalRow = document.createElement('p');
      totalRow.className = 'cart-row__total';

      // quantity stepper (same pattern as product-card__controls)
      const quantityEl = document.createElement('div');
      quantityEl.className = 'cart-row__controls';

      function renderQuantity(): void {
        quantityEl.replaceChildren();

        const quantity = getProductQuantity(productId);

        if (quantity === 0) {
          row.remove();
          renderFooter();
          return;
        }

        const decreaseButton = document.createElement('button');
        decreaseButton.type = 'button';
        decreaseButton.className = 'product-card__quantity-button';
        decreaseButton.textContent = '−';
        decreaseButton.setAttribute('aria-label', 'Уменьшить');

        decreaseButton.addEventListener('click', () => {
          if (quantity <= 1) return;
          updateCartQuantity(productId, quantity - 1);
          renderQuantity();
          renderFooter();
        });

        const quantityValue = document.createElement('span');
        quantityValue.className = 'product-card__quantity';
        quantityValue.textContent = String(quantity);

        const increaseButton = document.createElement('button');
        increaseButton.type = 'button';
        increaseButton.className = 'product-card__quantity-button';
        increaseButton.textContent = '+';
        increaseButton.setAttribute('aria-label', 'Увеличить');

        increaseButton.addEventListener('click', () => {
          updateCartQuantity(productId, quantity + 1);
          renderQuantity();
          renderFooter();
        });

        const unit = document.createElement('span');
        unit.className = 'quantity__unit';
        unit.textContent = 'шт.';

        quantityEl.append(decreaseButton, quantityValue, increaseButton, unit);
        totalRow.textContent = formatPrice(productPrice * quantity);
      }

      renderQuantity();

      row.append(quantityEl);
      row.append(totalRow);

      // remove
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'cart-row__remove';
      removeBtn.dataset.action = 'remove';
      removeBtn.dataset.id = productId;
      removeBtn.setAttribute('aria-label', `Удалить ${product.name}`);
      removeBtn.innerHTML = removeIcon();
      row.append(removeBtn);

      list.append(row);
    });

    renderFooter();

    body.append(list);
    section.append(body);

    footer.append(summary);
    footer.append(promoRow);
    section.append(footer);
  }

  return section;
}