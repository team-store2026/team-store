export function flowerSvg(className: string): string {
  const petals = Array.from(
    { length: 10 },
    (_, index) =>
      `<ellipse cx="60" cy="27" rx="11" ry="27" transform="rotate(${index * 36} 60 60)" />`,
  ).join('');

  return `
    <svg class="${className}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g fill="currentColor">${petals}<circle cx="60" cy="60" r="13" /></g>
    </svg>
  `;
}

export const cartIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M5.5 8h13l-1.1 12.5h-10.8L5.5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
`;

export function removeIcon(): string {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l14 14M15 1L1 15"/></svg>`;
}
