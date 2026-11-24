import rssLogo from '../assets/rss-logo.svg';

export function renderFooter(): string {
  return `
    <footer class="footer">
      <span>© 2026 Team Store</span>
      <span class="footer__dots">✦ ✦ ✦</span>
      <a class="button footer__rss" href="https://rs.school/" target="_blank"
        rel="noopener noreferrer">
        <img src="${rssLogo}" alt="" width="26" height="26" />
        <span>RS School</span>
      </a>
    </footer>
  `;
}
