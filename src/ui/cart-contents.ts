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
    summary.innerHTML = `<span class="cart-summary__total">Итого: <strong>${formatPrice(0)}</strong></span>`;
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

      summary.innerHTML = `
        <div class="cart-summary__row">
          <span class="cart-summary__label">Выбрано товаров: ${totalQuantity} шт.</span>
          <span class="cart-summary__value">${formatPrice(cartSubtotal)}</span>
        </div>
        ${cartDiscount > 0
          ? `<div class="cart-summary__row">
              <span class="cart-summary__label">Скидка по коду ${cart.promoCode} (${cart.discount}%)</span>
              <span class="cart-summary__value">−${formatPrice(cartDiscount)}</span>
            </div>`
          : ''}
        <div class="cart-summary__row cart-summary__row--total">
          <span class="cart-summary__label">Итого к оплате</span>
          <span class="cart-summary__value">${formatPrice(cartTotal)}</span>
        </div>
      `;

      promoRow.innerHTML = `
        <div class="cart-promo__form">
          <span class="cart-promo__group">
            <input class="cart-promo__input" type="text" placeholder="Промокод:" aria-label="Промокод" />
            <button type="button" class="cart-promo__apply" data-action="apply-promo">Применить</button>
          </span>
          ${cart.items.length > 0
            ? `<button class="btn btn--dark cart-summary__checkout" data-action="checkout">Оформить заказ</button>`
            : ''}
        </div>
        <p class="cart-promo__status" data-promo-status>${promoStatus}</p>
      `;
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
      info.innerHTML = `
        <h3 class="cart-row__name">${product.name}</h3>
        <p class="cart-row__meta">Артикул: <span>${productId}</span></p>
        <p class="cart-row__meta">Наличие: <span>в наличии</span></p>
        <p class="cart-row__price">${formatPrice(productPrice)}</p>
      `;
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