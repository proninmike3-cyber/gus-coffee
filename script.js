'use strict';
// Подтверждённые позиции меню и цены, предоставленные заказчиком.
const data = {
  coffee: [
    {
      title: 'Капучино',
      desc: 'Классический кофейный напиток, сочетающий в себе насыщенный вкус эспрессо и бархатистую текстуру молочной пены.',
      image: 'drink-coffee.svg',
      alt: 'Иллюстрация капучино',
      tag: 'КОФЕ · ЭСПРЕССО И МОЛОКО',
      sizes: [{volume:'250 мл',price:180},{volume:'350 мл',price:220},{volume:'450 мл',price:250}]
    },
    {
      title: 'Американо',
      desc: 'Классический кофейный напиток на основе эспрессо с добавлением горячей воды. Особенности напитка: насыщенный кофейный аромат, глубокий коричневый цвет, сбалансированная мягкость вкуса и объёмная порция для длительного наслаждения.',
      image: 'drink-coffee.svg',
      alt: 'Иллюстрация американо',
      tag: 'КОФЕ · ЭСПРЕССО И ВОДА',
      sizes: [{volume:'250 мл',price:150},{volume:'350 мл',price:180},{volume:'450 мл',price:200}]
    }
  ],
  bubble: [
    {
      title: 'Бабл-ти с карамельной тапиокой',
      desc: 'Нежный молочный коктейль с изысканными карамельными нотами и жевательными шариками тапиоки, увенчанный воздушной молочной пенкой.',
      image: 'drink-bubble.svg',
      alt: 'Иллюстрация бабл-ти с карамельной тапиокой',
      tag: 'БАБЛ БАР · КАРАМЕЛЬНАЯ ТАПИОКА',
      sizes: [{volume:'500 мл',price:390}]
    }
  ]
};
const palette = ['visual-cream','visual-peach','visual-lilac'];
const categoryNames = {coffee:'КОФЕ',bubble:'БАБЛ БАР'};
const menuItems = document.getElementById('menu-items');
const tabs = [...document.querySelectorAll('.tab')];
const priceText = value => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
function renderMenu(category) {
  const key = Object.hasOwn(data,category) ? category : 'coffee';
  const list = data[key];
  menuItems.classList.add('menu-priced');
  menuItems.classList.toggle('single',list.length===1);
  menuItems.innerHTML = list.map((item,i) => `
    <article class="menu-card" style="animation-delay:${i*55}ms">
      <div class="menu-card-visual ${palette[(i+Object.keys(data).indexOf(key))%palette.length]}">
        <span class="menu-card-index">${String(i+1).padStart(2,'0')} / ${categoryNames[key]}</span>
        <img src="assets/${item.image}" alt="${item.alt}" width="480" height="540" loading="lazy" />
      </div>
      <div class="menu-card-info">
        <span class="menu-card-tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="menu-volume-list" aria-label="Объёмы и цены">
          ${item.sizes.map(size => `<div class="menu-volume-row"><span>${size.volume}</span><strong>${priceText(size.price)}</strong></div>`).join('')}
        </div>
      </div>
    </article>`).join('');
}
renderMenu('coffee');
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>{t.classList.remove('is-active');t.setAttribute('aria-selected','false');t.tabIndex=-1;});
    tab.classList.add('is-active');tab.setAttribute('aria-selected','true');tab.tabIndex=0;
    renderMenu(tab.dataset.tab);
  });
  tab.tabIndex=i===0?0:-1;
  tab.addEventListener('keydown',e=>{
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
    e.preventDefault();
    const next=(tabs.indexOf(tab)+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    tabs[next].focus();tabs[next].click();
  });
});
const toggle=document.querySelector('.menu-toggle');
const mobileNav=document.getElementById('mobile-nav');
function closeNav(){mobileNav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');toggle.innerHTML='<svg class="icon"><use href="#i-menu"/></svg>';document.body.classList.remove('nav-is-open');}
toggle.addEventListener('click',()=>{
  if(!mobileNav.hidden){closeNav();return;}
  mobileNav.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Закрыть меню');toggle.innerHTML='<svg class="icon"><use href="#i-close"/></svg>';document.body.classList.add('nav-is-open');
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeNav();});
window.addEventListener('resize',()=>{if(window.innerWidth>900&&!mobileNav.hidden)closeNav();});
