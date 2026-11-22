import './styles/main.css';

import { navLinks, pageTitles, Page } from './data/navigation';
import {
  getCartFromStorage,
  saveCartToStorage,
  addItemToCart,
  removeItemFromCart,
  PROMO_CODES,
} from './data/cart';
import { renderHeader } from './ui/header';
import { renderHero } from './ui/hero';
import { renderMarquee } from './ui/marquee';
import { renderTeam } from './ui/team';
import { renderCatalog } from './ui/catalog';
import { renderCart } from './ui/cart-page';
import { renderCartContents } from './ui/cart-contents';
import { showToast } from './ui/toast';
import { renderFooter } from './ui/footer';
import { renderProducts } from './ui/products';

const appRoot = document.querySelector<HTMLDivElement>('#app');

if (!appRoot) {
  throw new Error('Не найден корневой элемент #app');
}

const root: HTMLDivElement = appRoot;

let currentPage: Page = pageFromHash();

function attachListeners(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[data-page]')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo(link.dataset.page);
      });
    });

  document
    .querySelectorAll<HTMLButtonElement>('[data-action="add-to-cart"]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (!id) return;

        saveCartToStorage(addItemToCart(getCartFromStorage(), id));
        render();
      });
    });

  const checkoutBtn = document.querySelector<HTMLButtonElement>(
    '[data-action="checkout"]',
  );
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('Заказ оформлен! (демо)', 'success');
      saveCartToStorage({ items: [], promoCode: null, discount: 0 });
      navigateTo('catalog');
    });
  }

  document
    .querySelectorAll<HTMLButtonElement>('[data-action="remove"]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (!id) return;
        saveCartToStorage(removeItemFromCart(getCartFromStorage(), id));
        render();
      });
    });

  const applyPromoBtn = document.querySelector<HTMLButtonElement>(
    '[data-action="apply-promo"]',
  );
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const input =
        document.querySelector<HTMLInputElement>('.cart-promo__input');
      const code = input?.value.trim().toUpperCase() ?? '';
      const cart = getCartFromStorage();

      if (code && code in PROMO_CODES) {
        saveCartToStorage({
          ...cart,
          promoCode: code,
          discount: PROMO_CODES[code],
        });
      } else if (code) {
        showToast('Промокод не найден', 'error');
        return;
      } else {
        saveCartToStorage({ ...cart, promoCode: null, discount: 0 });
      }
      render();
    });
  }
}

function navigateTo(page: string | undefined): void {
  const next = navLinks.find((link) => link.page === page);

  if (!next || next.page === currentPage) {
    return;
  }

  window.location.hash = `/${next.page}`;
}

window.addEventListener('hashchange', () => {
  currentPage = pageFromHash();
  render();
  window.scrollTo({ top: 0 });
});

function pageFromHash(): Page {
  const page = window.location.hash.replace(/^#\/?/, '');
  const match = navLinks.find((link) => link.page === page);
  return match ? match.page : 'about';
}

function renderPageContent(page: Page): string {
  if (page === 'catalog') {
    return renderCatalog();
  }

  if (page === 'cart') {
    return renderCart();
  }

  return `${renderHero('about')}${renderMarquee()}${renderTeam()}<div data-products-placeholder></div>`;
}

function updateCartLinkCount(): void {
  const cartLink = root.querySelector<HTMLAnchorElement>('.cart-link');

  if (!cartLink) {
    return;
  }

  const totalQuantity = getCartFromStorage().items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  let count = cartLink.querySelector<HTMLSpanElement>('.cart-link__count');

  if (!count) {
    count = document.createElement('span');
    count.className = 'cart-link__count';
    cartLink.append(count);
  }

  count.textContent = String(totalQuantity);
  count.hidden = totalQuantity === 0;
}

window.addEventListener('cart-updated', updateCartLinkCount);

function render(): void {
  document.title = pageTitles[currentPage];

  root.innerHTML = `
    <div class="topbar" aria-hidden="true"><div class="topbar__dots"></div></div>
    <div class="shell">
      ${renderHeader(currentPage)}
      <main class="page">${renderPageContent(currentPage)}</main>
      ${renderFooter()}
    </div>
  `;

  if (currentPage === 'catalog') {
    const productsPlaceholder = root.querySelector<HTMLDivElement>(
      '[data-products-placeholder]',
    );

    if (productsPlaceholder) {
      productsPlaceholder.replaceWith(renderProducts());
    }
  }

  if (currentPage === 'cart') {
    const cartPlaceholder = root.querySelector<HTMLDivElement>(
      '[data-products-placeholder]',
    );

    if (cartPlaceholder) {
      cartPlaceholder.replaceWith(renderCartContents());
    }
  }

  attachListeners();
  updateCartLinkCount();
}

render();
