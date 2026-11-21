import { renderHero } from './hero';
import { renderMarquee } from './marquee';

export function renderCart(): string {
  return `${renderHero('cart')}${renderMarquee()}<div data-products-placeholder></div>`;
}
