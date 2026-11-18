'use strict';
const data = {
  coffee: [
    {title:'Капучино', desc:'Любимая классика с нежной пенкой.', image:'drink-coffee.svg', alt:'Иллюстрация капучино', tag:'КОФЕЙНАЯ КЛАССИКА'},
    {title:'Латте', desc:'Мягкий, сливочный, уютный.', image:'drink-coffee.svg', alt:'Иллюстрация латте', tag:'КОФЕЙНАЯ КЛАССИКА'},
    {title:'Раф', desc:'Нежный кофе для неспешного момента.', image:'drink-coffee.svg', alt:'Иллюстрация рафа', tag:'КОФЕЙНАЯ КЛАССИКА'},
    {title:'Эспрессо', desc:'Маленькая чашка большого характера.', image:'drink-coffee.svg', alt:'Иллюстрация эспрессо', tag:'КОФЕЙНАЯ КЛАССИКА'}
  ],
  signature: [
    {title:'Сырная пенка',desc:'Та самая воздушная шапочка, которую хвалят гости.',image:'drink-coffee.svg',alt:'Иллюстрация авторского кофе с пенкой',tag:'ЛЮБИМЧИК ГОСТЕЙ'},
    {title:'Авторский кофе',desc:'Когда хочется отойти от классики.',image:'drink-coffee.svg',alt:'Иллюстрация авторского кофе',tag:'КОФЕ С ХАРАКТЕРОМ'},
    {title:'На растительном',desc:'Мягкий вкус и твой любимый вариант молока.',image:'drink-coffee.svg',alt:'Иллюстрация кофе на растительном молоке',tag:'ПО НАСТРОЕНИЮ'},
    {title:'Сезонное',desc:'Напитки, которые особенно хороши именно сейчас.',image:'drink-bubble.svg',alt:'Иллюстрация сезонного напитка',tag:'СПРОСИ У БАРИСТА'}
  ],
  noncoffee: [
    {title:'Бабл-ти',desc:'Чай, шарики и удовольствие в одном стакане.',image:'drink-bubble.svg',alt:'Иллюстрация бабл-ти',tag:'ЛЮБИМЧИК ГОСТЕЙ'},
    {title:'Какао',desc:'Почти объятие. Только в чашке.',image:'drink-coffee.svg',alt:'Иллюстрация какао',tag:'И ДЕТЯМ, И ВЗРОСЛЫМ'},
    {title:'Матча',desc:'Для тех, кто выбирает свой ритм.',image:'drink-bubble.svg',alt:'Иллюстрация матча',tag:'НЕ ТОЛЬКО КОФЕ'},
    {title:'Авторский чай',desc:'Вкусный повод сделать паузу.',image:'drink-bubble.svg',alt:'Иллюстрация авторского чая',tag:'НЕ ТОЛЬКО КОФЕ'}
  ],
  dessert: [
    {title:'Круассаны',desc:'Слоёные, воздушные, хороши к кофе.',image:'drink-dessert.svg',alt:'Иллюстрация круассана',tag:'К КОФЕ'},
    {title:'Эклеры и шу',desc:'Сладкий повод остаться подольше.',image:'drink-dessert.svg',alt:'Иллюстрация сладкой выпечки',tag:'СЛАДКАЯ ПАУЗА'},
    {title:'Моти',desc:'Необычный десерт для любопытных.',image:'drink-dessert.svg',alt:'Иллюстрация десерта',tag:'СЛАДКАЯ ПАУЗА'},
    {title:'Шоколадный фондан',desc:'Когда хочется по-настоящему шоколадного.',image:'drink-dessert.svg',alt:'Иллюстрация десерта',tag:'ДЛЯ НАСТРОЕНИЯ'}
  ]
};
const palette = ['visual-cream','visual-peach','visual-lilac','visual-lime'];
const categoryNames = {coffee:'КОФЕ',signature:'АВТОРСКОЕ',noncoffee:'НЕ КОФЕ',dessert:'ДЕСЕРТЫ'};
const menuItems = document.getElementById('menu-items');
const tabs = [...document.querySelectorAll('.tab')];
function renderMenu(category) {
  const list = data[category] || data.coffee;
  menuItems.innerHTML = list.map((item,i) => `
    <article class="menu-card" style="animation-delay:${i*55}ms">
      <div class="menu-card-visual ${palette[(i+Object.keys(data).indexOf(category))%palette.length]}">
        <span class="menu-card-index">0${i+1} / ${categoryNames[category]}</span>
        <img src="assets/${item.image}" alt="${item.alt}" width="480" height="540" loading="lazy" />
      </div>
      <div class="menu-card-info"><h3>${item.title}</h3><p>${item.desc}</p><span class="menu-card-tag">${item.tag}</span></div>
    </article>`).join('');
}
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
