(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{page:`about`,label:`О нас`},{page:`catalog`,label:`Каталог`},{page:`cart`,label:`Корзина`}],t={about:`О нас — Team Store`,catalog:`Каталог — Team Store`,cart:`Корзина — Team Store`},n={SALE10:10,WELCOME:15,VIP20:20},r=`team-store-cart`;function i(){if(typeof window>`u`)return{items:[],promoCode:null,discount:0};try{let e=localStorage.getItem(r);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.items)&&typeof t.discount==`number`)return{items:t.items,promoCode:t.promoCode??null,discount:t.discount}}}catch{}return{items:[],promoCode:null,discount:0}}function a(e){typeof window<`u`&&localStorage.setItem(r,JSON.stringify(e))}function o(){window.dispatchEvent(new Event(`cart-updated`))}function s(e){let t=i().items.find(t=>t.productId===e);return t?t.quantity:0}function c(e){let t=i(),n=t.items.find(t=>t.productId===e);n?n.quantity+=1:t.items.push({productId:e,quantity:1}),a(t),o()}function l(e,t){let n=i();if(t<=0)n.items=n.items.filter(t=>t.productId!==e);else{let r=n.items.find(t=>t.productId===e);r?r.quantity=t:n.items.push({productId:e,quantity:t})}a(n),o()}function u(e,t){let n=0;for(let r of e.items){let e=t.find(e=>e.id===r.productId);e&&(n+=e.price*r.quantity)}let r=Math.round(n*(e.discount/100)),i=n-r;return{subtotal:n,discount:r,total:i}}function d(e,t){return e.items.find(e=>e.productId===t)?{...e,items:e.items.map(e=>e.productId===t?{...e,quantity:e.quantity+1}:e)}:{...e,items:[...e.items,{productId:t,quantity:1}]}}function f(e,t){return{...e,items:e.items.filter(e=>e.productId!==t)}}function p(e){return new Intl.NumberFormat(`ru-RU`,{style:`currency`,currency:`RUB`,minimumFractionDigits:0}).format(e)}function m(e){return`
    <svg class="${e}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g fill="currentColor">${Array.from({length:10},(e,t)=>`<ellipse cx="60" cy="27" rx="11" ry="27" transform="rotate(${t*36} 60 60)" />`).join(``)}<circle cx="60" cy="60" r="13" /></g>
    </svg>
  `}var h=`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M5.5 8h13l-1.1 12.5h-10.8L5.5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
`;function g(){return`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l14 14M15 1L1 15"/></svg>`}function _(t){let n=e.map(e=>{let n=e.page===t;return`<a href="#/${e.page}" data-page="${e.page}" class="${n?`active`:``}"
        ${n?`aria-current="page"`:``}>${e.label}</a>`}).join(``),r=t===`cart`;return`
    <header class="site-header">
      <a class="logo" href="#/about" data-page="about">
        ${m(`logo__flower`)}
        <span>team store</span>
      </a>
      <nav class="site-nav" aria-label="Основная навигация">${n}</nav>
      <a class="cart-link ${r?`is-active`:``}" href="#/cart" data-page="cart"
        aria-label="Корзина" ${r?`aria-current="page"`:``}>${h}</a>
    </header>
  `}var v={about:{eyebrow:`О нас`,title:`Делаем<br />магазин<br />вместе`,lead:`<strong>Team Store</strong> — учебный проект команды из двух разработчиков.
        Каталог с фильтрами, корзина, промокод и аккуратный интерфейс: собираем
        магазин так, будто он настоящий.`,action:{label:`Смотреть каталог`,page:`catalog`},note:`2 разработчика<br />1 магазин`},catalog:{eyebrow:`Каталог`,title:`Найди<br />свою<br />вещь`,lead:`Долой скучный минимализм и стерильные интерьеры, 
    в которых страшно поставить чашку не на подставку! 
    Наступила эра дофаминового декора — стиля, который кричит: «Я здесь, и мне весело!».<br>

    <strong>Дофаминовый декор</strong> — это не просто яркие цвета. Это про гормоны счастья, 
    которые ты получаешь, когда смотришь на любимый постер, смешную вазу в форме собаки или ковер цвета фуксии. 
    Это интерьер, который обнимает тебя, а не оценивает.`,action:{label:`Перейти в корзину`,page:`cart`},note:`скоро в<br />продаже`},cart:{eyebrow:`Корзина`,title:`Собери<br />свой<br />заказ`,lead:`В твоей корзине пока тихо. Наполни её вещами, которые поднимают настроение! 
    Переходи в каталог за порцией дофамина, выбирай самое сочное, а мы всё посчитаем.`,action:{label:`Перейти в каталог`,page:`catalog`},note:`Время<br />выбирать`}},y={about:[`design`,`code`,`ship`],catalog:[`ярко`,`Странно`,`Красиво`],cart:[`Купи`,`меня`,`скорее`]};function b(e=`about`){let t=v[e],[n,r,i]=y[e];return`
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">${t.eyebrow}</p>
        <h1 class="hero__title">${t.title}</h1>
        <p class="hero__lead">${t.lead}</p>
        <div class="hero__actions">
          <a class="button about__button" href="#/${t.action.page}"
            data-page="${t.action.page}">${t.action.label}</a>
        </div>
      </div>
      <div class="hero__visual">
        ${m(`hero__flower`)}
        <div class="pack pack--a">
          <span class="pack__brand">team store</span>
          <span class="pack__word">${n}</span>
          <span class="pack__meta">est. 2026</span>
        </div>
        <div class="pack pack--b">
          <span class="pack__brand">team store</span>
          <span class="pack__word">${r}</span>
          <span class="pack__meta">est. 2026</span>
        </div>
        <div class="pack pack--c">
          <span class="pack__brand">team store</span>
          <span class="pack__word">${i}</span>
          <span class="pack__meta">est. 2026</span>
        </div>
        <p class="visual-note">${t.note}</p>
      </div>
    </section>
  `}var x=[`код`,`дизайн`,`каталог`,`корзина`,`промокод`,`localstorage`];function S(){let e=x.map(e=>`<span class="marquee__item">${e}</span><span class="marquee__sep">✦</span>`).join(``);return`
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <div class="marquee__group">${e}</div>
        <div class="marquee__group">${e}</div>
      </div>
    </div>
  `}var C=[{num:`01`,title:`Участник 1`,github:`KateKurakina`,githubUrl:`https://github.com/KateKurakina`,role:`Екатерина Куракина`,contribution:`Настройка проекта, каталог, карточки товаров, фильтрация по категориям и сортировка по цене.`,art:`pink`},{num:`02`,title:`Участник 2`,github:`Faratora`,githubUrl:`https://github.com/Faratora`,role:`Светлана Савина`,contribution:`Настройка проекта, страница "О нас", корзина, промокод и сохранение покупок в localStorage. `,art:`olive`}],w=[{value:`02`,label:`разработчика`},{value:`01`,label:`репозиторий`},{value:`100%`,label:`практика`}];function T(){return`
    <section class="team">
      <div class="section-head">
        <div>
          <p class="eyebrow">Команда</p>
          <h2 class="section-head__title">
            Наша команда
            <span class="section-head__count">02</span>
          </h2>
        </div>
        <p class="section-head__note">Два человека, один репозиторий и общая цель —
        довести учебный магазин до рабочего деплоя.</p>
      </div>
      <div class="team-grid">${C.map(e=>`
        <article class="team-card">
          <h3 class="team-card__title">${e.title}</h3>
          <div class="team-card__art team-card__art--${e.art}">
            <span class="team-card__num">${e.num}</span>
            ${m(`team-card__flower`)}
            <span class="team-card__tag">${e.role}</span>
          </div>
          <p class="team-card__about">${e.contribution}</p>
          ${e.githubUrl?`<a class="team-card__github"
                   href="${e.githubUrl}" target="_blank" rel="noopener noreferrer"
                   aria-label="GitHub: ${e.github} (откроется в новой вкладке)">
                   <span>GitHub</span>
                   <span class="team-card__github-name">
                     <code>${e.github}</code>
                     <span class="team-card__arrow" aria-hidden="true">↗</span>
                   </span>
                 </a>`:`<p class="team-card__github">
                   <span>GitHub</span>
                   <code>${e.github}</code>
                 </p>`}
        </article>
      `).join(``)}</div>

      <div class="manifesto">
        ${m(`manifesto__flower`)}
        <div class="manifesto__text">
          <p class="eyebrow eyebrow--light">Наш подход</p>
          <h3 class="manifesto__title">Учебный проект — тоже продукт</h3>
          <p>Мы не делим работу на «моё» и «твоё»: каждый понимает, как устроен
          весь магазин — от фильтров до промокода и сохранения корзины.</p>
        </div>
        <div class="stats">
          ${w.map(e=>`
                <div class="stat">
                  <span class="stat__value">${e.value}</span>
                  <span class="stat__label">${e.label}</span>
                </div>
              `).join(``)}
        </div>
      </div>
    </section>
  `}function E(){return`${b(`catalog`)}${S()}<div data-products-placeholder></div>`}function D(){return`${b(`cart`)}${S()}<div data-products-placeholder></div>`}var O=[{id:`1`,name:`Светильник настольный`,category:`Освещение`,price:2199,image:`/team-store/src/assets/img/products/lamp.png`},{id:`2`,name:`Комплект постельного белья`,category:`Спальня`,price:3499,image:`/team-store/src/assets/img/products/pillow.png`},{id:`3`,name:`Стул обеденный`,category:`Мебель`,price:5199,image:`/team-store/src/assets/img/products/chair.png`},{id:`4`,name:`Тарелка десертная`,category:`Посуда`,price:650,image:`/team-store/src/assets/img/products/plate.png`},{id:`5`,name:`Светильник подвесной`,category:`Освещение`,price:650,image:`/team-store/src/assets/img/products/light.png`},{id:`6`,name:`Картина`,category:`Декор`,price:1650,image:`/team-store/src/assets/img/products/optimize.webp`},{id:`7`,name:`Полка для ванной`,category:`Ванная`,price:845,image:`/team-store/src/assets/img/products/shelf.webp`},{id:`8`,name:`Держатель для полотенец`,category:`Ванная`,price:845,image:`/team-store/src/assets/img/products/holder.webp`},{id:`9`,name:`Крючок для хранения`,category:`Хранение`,price:135,image:`/team-store/src/assets/img/products/hook.webp`},{id:`10`,name:`Домовой`,category:`Декор`,price:2300,image:`/team-store/src/assets/img/products/toy.jpg`},{id:`11`,name:`Денежная жаба`,category:`Декор`,price:11e3,image:`/team-store/src/assets/img/products/frog.jpg`},{id:`12`,name:`Панно керамика`,category:`Декор`,price:33e3,image:`/team-store/src/assets/img/products/panno.jpg`},{id:`13`,name:`Настольная лампа`,category:`Освещение`,price:1800,image:`/team-store/src/assets/img/products/lampa-zefirka.jpg`},{id:`14`,name:`Декоративная подушка`,category:`Декор`,price:2500,image:`/team-store/src/assets/img/products/podushka-kovrovaya-vyshivk.jpg`},{id:`15`,name:`Свеча`,category:`Декор`,price:1800,image:`/team-store/src/assets/img/products/candle.jpg`}];function k(){let e=i(),t=document.createElement(`section`);t.className=`cart`;let n=document.createElement(`div`);n.className=`section-head`;let r=document.createElement(`div`),a=document.createElement(`p`);a.className=`eyebrow`,a.textContent=`Товар`;let o=document.createElement(`h2`);o.className=`section-head__title`,o.textContent=`Выбрать товар`;let c=document.createElement(`p`);if(c.className=`section-head__note`,c.textContent=`Выбери то, что поднимает настроение — и добавь в корзину.`,r.append(a,o),n.append(r,c),t.append(n),e.items.length===0){let e=document.createElement(`p`);e.className=`cart-empty`,e.textContent=`Корзина пуста`,t.append(e);let n=document.createElement(`div`);n.className=`cart-summary cart-summary--empty`;let r=document.createElement(`span`);r.className=`cart-summary__total`,r.innerHTML=`Итого: <strong>${p(0)}</strong>`,n.append(r),t.append(n)}else{let n=document.createElement(`div`);n.className=`cart-body`;let r=document.createElement(`div`);r.className=`cart-list`;let a=document.createElement(`div`);a.className=`cart-footer`;let o=document.createElement(`div`);o.className=`cart-summary`;let c=document.createElement(`div`);c.className=`cart-promo`;function d(){let e=i(),{subtotal:t,discount:n,total:r}=u(e,O),a=e.items.reduce((e,t)=>e+t.quantity,0),s=e.promoCode?`Промоко ${e.promoCode} применён (−${e.discount}%)`:`Промокод не выбран`;o.replaceChildren();let l=document.createElement(`div`);l.className=`cart-summary__row`;let d=document.createElement(`span`);d.className=`cart-summary__label`,d.textContent=`Выбрано товаров: ${a} шт.`;let f=document.createElement(`span`);if(f.className=`cart-summary__value`,f.textContent=p(t),l.append(d,f),o.append(l),n>0){let t=document.createElement(`div`);t.className=`cart-summary__row`;let r=document.createElement(`span`);r.className=`cart-summary__label`,r.textContent=`Скидка по коду ${e.promoCode} (${e.discount}%)`;let i=document.createElement(`span`);i.className=`cart-summary__value`,i.textContent=`−${p(n)}`,t.append(r,i),o.append(t)}let m=document.createElement(`div`);m.className=`cart-summary__row cart-summary__row--total`;let h=document.createElement(`span`);h.className=`cart-summary__label`,h.textContent=`Итого к оплате`;let g=document.createElement(`span`);g.className=`cart-summary__value`,g.textContent=p(r),m.append(h,g),o.append(m),c.replaceChildren();let _=document.createElement(`div`);_.className=`cart-promo__form`;let v=document.createElement(`span`);v.className=`cart-promo__group`;let y=document.createElement(`input`);y.className=`cart-promo__input`,y.type=`text`,y.placeholder=`Промокод:`,y.setAttribute(`aria-label`,`Промокод`);let b=document.createElement(`button`);if(b.type=`button`,b.className=`button cart-promo__button`,b.dataset.action=`apply-promo`,b.textContent=`Применить`,v.append(y,b),e.items.length>0){let e=document.createElement(`button`);e.className=`button cart-summary__button`,e.dataset.action=`checkout`,e.textContent=`Оформить заказ`,_.append(v,e)}else _.append(v);let x=document.createElement(`p`);x.className=`cart-promo__status`,x.dataset.promoStatus=``,x.textContent=s,c.append(_,x)}e.items.forEach(e=>{let t=O.find(t=>t.id===e.productId);if(!t)return;let{id:n,price:i}=t,a=document.createElement(`article`);a.className=`cart-row`;let o=document.createElement(`img`);o.className=`cart-row__image`,o.src=t.image,o.alt=t.name,o.loading=`lazy`,a.append(o);let c=document.createElement(`div`);c.className=`cart-row__info`;let u=document.createElement(`h3`);u.className=`cart-row__name`,u.textContent=t.name;let f=document.createElement(`p`);f.className=`cart-row__meta`,f.innerHTML=`Категория: <span>${t.category}</span>`;let m=document.createElement(`p`);m.className=`cart-row__meta`,m.textContent=`Наличие: в наличии`;let h=document.createElement(`p`);h.className=`cart-row__price`,h.textContent=p(i),c.append(u,f,m,h),a.append(c);let _=document.createElement(`p`);_.className=`cart-row__total`;let v=document.createElement(`div`);v.className=`cart-row__controls`;function y(){v.replaceChildren();let e=s(n);if(e===0){a.remove(),d();return}let t=document.createElement(`button`);t.type=`button`,t.className=`product-card__quantity-button`,t.textContent=`−`,t.setAttribute(`aria-label`,`Уменьшить`),t.addEventListener(`click`,()=>{e<=1||(l(n,e-1),y(),d())});let r=document.createElement(`span`);r.className=`product-card__quantity`,r.textContent=String(e);let o=document.createElement(`button`);o.type=`button`,o.className=`product-card__quantity-button`,o.textContent=`+`,o.setAttribute(`aria-label`,`Увеличить`),o.addEventListener(`click`,()=>{l(n,e+1),y(),d()});let c=document.createElement(`span`);c.className=`quantity__unit`,c.textContent=`шт.`,v.append(t,r,o,c),_.textContent=p(i*e)}y(),a.append(v),a.append(_);let b=document.createElement(`button`);b.type=`button`,b.className=`cart-row__remove`,b.dataset.action=`remove`,b.dataset.id=n,b.setAttribute(`aria-label`,`Удалить ${t.name}`),b.innerHTML=g(),a.append(b),r.append(a)}),d(),n.append(r),t.append(n),a.append(o),a.append(c),t.append(a)}return t}var A=3500,j=null;function M(){return j&&document.body.contains(j)||(j=document.createElement(`div`),j.className=`toast-stack`,j.dataset.toastStack=``,document.body.append(j)),j}function N(e,t=`success`){let n=document.createElement(`div`);n.className=`toast toast--${t}`,n.textContent=e,n.setAttribute(`role`,t===`error`?`alert`:`status`);let r=document.createElement(`button`);r.type=`button`,r.className=`toast__close`,r.setAttribute(`aria-label`,`Закрыть уведомление`),r.textContent=`×`;function i(){n.isConnected&&!n.classList.contains(`toast--leaving`)&&(n.classList.add(`toast--leaving`),n.addEventListener(`animationend`,()=>n.remove(),{once:!0}))}r.addEventListener(`click`,i),n.append(r),M().append(n),window.setTimeout(i,A)}var P=`data:image/svg+xml,%3csvg%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_5701_38384)'%3e%3ccircle%20cx='32'%20cy='32'%20r='32'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13%2021.5095V42.5L19.3067%2042.4621V33.9474C20.0567%2033.9474%2020.7616%2033.9775%2021.4049%2034.4267C21.8946%2034.8785%2022.2838%2035.4335%2022.546%2036.054L25.9202%2042.4621H33C31.5957%2039.6675%2030.4706%2036.1327%2028.0552%2034.0104C27.5455%2033.6749%2026.9919%2033.4158%2026.411%2033.241C27.1873%2033.0779%2027.9357%2032.7973%2028.6319%2032.4084C30.3855%2031.3375%2031.3915%2029.3808%2031.3436%2027.3374C31.3798%2026.1328%2031.0495%2024.9466%2030.3988%2023.9441C28.9256%2021.6883%2025.9337%2021.4213%2023.4663%2021.5095H13ZM21.9939%2030.0116H19.3313V25.6975H22.1043C23.4807%2025.5594%2025.1814%2026.1754%2025.0859%2027.8041C25.1499%2029.5621%2023.3647%2029.9127%2021.9939%2030.0116Z'%20fill='%23FFB749'/%3e%3cpath%20d='M39.4768%2035.089L33%2035.4666C33.1262%2037.3671%2034.0021%2039.16%2035.4636%2040.5088C36.9117%2041.8323%2039.5076%2042.4941%2043.2515%2042.4941C46.3564%2042.5823%2049.9058%2041.8146%2051.821%2039.1569C52.5929%2038.0934%2053.0033%2036.8427%2052.9998%2035.564C53.0217%2033.1848%2051.4339%2031.2297%2049.3044%2030.3147C47.2632%2029.4766%2045.1198%2028.8674%2042.9204%2028.5C42.1107%2028.41%2041.3327%2028.1563%2040.6423%2027.757C39.9039%2027.2597%2040.078%2026.2272%2040.735%2025.7596C42.6084%2024.5207%2045.6299%2025.5545%2045.8608%2027.9032L52.2845%2027.5621C52.1703%2025.768%2051.1844%2024.0545%2049.6356%2022.9583C47.6987%2021.8887%2045.4532%2021.3874%2043.1986%2021.5212C41.3493%2021.4527%2039.5037%2021.7218%2037.7682%2022.3128C35.6082%2023.1125%2033.829%2025.064%2033.8344%2027.4525C33.7931%2028.9377%2034.5158%2030.4088%2035.755%2031.3621C37.6454%2032.6238%2039.8325%2033.4582%2042.139%2033.798C43.3833%2033.9637%2044.5727%2034.3795%2045.6224%2035.0159C46.5878%2035.7309%2046.5807%2037.167%2045.5959%2037.8903C44.5078%2038.6532%2042.9034%2038.7416%2041.6818%2038.2468C40.3717%2037.716%2039.6048%2036.4784%2039.4768%2035.089Z'%20fill='%23FFB749'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5701_38384'%3e%3crect%20width='64'%20height='64'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`;function F(){return`
    <footer class="footer">
      <span>© 2026 Team Store</span>
      <span class="footer__dots">✦ ✦ ✦</span>
      <a class="button footer__rss" href="https://rs.school/" target="_blank"
        rel="noopener noreferrer">
        <img src="${P}" alt="" width="26" height="26" />
        <span>RS School</span>
      </a>
    </footer>
  `}function I(e){let t=document.createElement(`article`);t.className=`product-card`;let n=document.createElement(`img`);n.className=`product-card__image`,n.src=e.image,n.alt=e.name,n.loading=`lazy`;let r=document.createElement(`div`);r.className=`product-card__info`;let i=document.createElement(`p`);i.className=`product-card__category`,i.textContent=e.category;let a=document.createElement(`h3`);a.className=`product-card__name`,a.textContent=e.name;let o=document.createElement(`p`);o.className=`product-card__price`,o.textContent=p(e.price);let u=document.createElement(`div`);u.className=`product-card__controls`;function d(){u.replaceChildren();let t=s(e.id);if(t===0){let t=document.createElement(`button`);t.className=`product-card__button`,t.type=`button`,t.textContent=`В корзину`,t.addEventListener(`click`,()=>{c(e.id),d()}),u.append(t);return}let n=document.createElement(`button`);n.className=`product-card__quantity-button`,n.type=`button`,n.textContent=`−`,n.setAttribute(`aria-label`,`Уменьшить количество`),n.addEventListener(`click`,()=>{l(e.id,t-1),d()});let r=document.createElement(`span`);r.className=`product-card__quantity`,r.textContent=String(t);let i=document.createElement(`button`);i.className=`product-card__quantity-button`,i.type=`button`,i.textContent=`+`,i.setAttribute(`aria-label`,`Увеличить количество`),i.addEventListener(`click`,()=>{l(e.id,t+1),d()}),u.append(n,r,i)}return d(),r.append(i,a,o,u),t.append(n,r),t}function L(e,t,n){let r=e.filter(e=>t===`all`||e.category===t);return n===`asc`&&(r=[...r].sort((e,t)=>e.price-t.price)),n===`desc`&&(r=[...r].sort((e,t)=>t.price-e.price)),r}function R(){let e=document.createElement(`section`);e.className=`products`;let t=document.createElement(`div`);t.className=`section-head`;let n=document.createElement(`div`),r=document.createElement(`p`);r.className=`eyebrow`,r.textContent=`Товар`;let i=document.createElement(`h2`);i.className=`section-head__title`,i.textContent=`Выбрать товар`;let a=document.createElement(`p`);a.className=`section-head__note`,a.textContent=`Выбери то, что поднимает настроение — и добавь в корзину.`,n.append(r,i),t.append(n,a);let o=document.createElement(`div`);o.className=`products-controls`;let s=document.createElement(`select`);s.className=`products-controls__select`,s.setAttribute(`aria-label`,`Фильтр по категории`);let c=document.createElement(`option`);c.value=`all`,c.textContent=`Все категории`,s.append(c);let l=[...new Set(O.map(e=>e.category))];l.sort((e,t)=>e.localeCompare(t,`ru`)),l.forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,s.append(t)});let u=document.createElement(`select`);u.className=`products-controls__select`,u.setAttribute(`aria-label`,`Сортировка по цене`),[{value:`default`,label:`По умолчанию`},{value:`asc`,label:`Сначала дешевле`},{value:`desc`,label:`Сначала дороже`}].forEach(({value:e,label:t})=>{let n=document.createElement(`option`);n.value=e,n.textContent=t,u.append(n)}),o.append(s,u);let d=document.createElement(`div`);d.className=`products-grid`;function f(){let e=s.value,t=u.value,n=L(O,e,t);d.replaceChildren(...n.map(e=>I(e)))}return s.addEventListener(`change`,f),u.addEventListener(`change`,f),f(),e.append(t,o,d),e}var z=document.querySelector(`#app`);if(!z)throw Error(`Не найден корневой элемент #app`);var B=z,V=W();function H(){document.querySelectorAll(`a[data-page]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),U(e.dataset.page)})}),document.querySelectorAll(`[data-action="add-to-cart"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;t&&(a(d(i(),t)),q())})});let e=document.querySelector(`[data-action="checkout"]`);e&&e.addEventListener(`click`,()=>{N(`Заказ оформлен! (демо)`,`success`),a({items:[],promoCode:null,discount:0}),U(`catalog`)}),document.querySelectorAll(`[data-action="remove"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;t&&(a(f(i(),t)),q())})});let t=document.querySelector(`[data-action="apply-promo"]`);t&&t.addEventListener(`click`,()=>{let e=document.querySelector(`.cart-promo__input`)?.value.trim().toUpperCase()??``,t=i();if(e&&e in n)a({...t,promoCode:e,discount:n[e]});else if(e){N(`Промокод не найден`,`error`);return}else a({...t,promoCode:null,discount:0});q()})}function U(t){let n=e.find(e=>e.page===t);n&&n.page!==V&&(window.location.hash=`/${n.page}`)}window.addEventListener(`hashchange`,()=>{V=W(),q(),window.scrollTo({top:0})});function W(){let t=window.location.hash.replace(/^#\/?/,``),n=e.find(e=>e.page===t);return n?n.page:`about`}function G(e){return e===`catalog`?E():e===`cart`?D():`${b(`about`)}${S()}${T()}<div data-products-placeholder></div>`}function K(){let e=B.querySelector(`.cart-link`);if(!e)return;let t=i().items.reduce((e,t)=>e+t.quantity,0),n=e.querySelector(`.cart-link__count`);n||(n=document.createElement(`span`),n.className=`cart-link__count`,e.append(n)),n.textContent=String(t),n.hidden=t===0}window.addEventListener(`cart-updated`,K);function q(){if(document.title=t[V],B.innerHTML=`
    <div class="topbar" aria-hidden="true"><div class="topbar__dots"></div></div>
    <div class="shell">
      ${_(V)}
      <main class="page">${G(V)}</main>
      ${F()}
    </div>
  `,V===`catalog`){let e=B.querySelector(`[data-products-placeholder]`);e&&e.replaceWith(R())}if(V===`cart`){let e=B.querySelector(`[data-products-placeholder]`);e&&e.replaceWith(k())}H(),K()}q();