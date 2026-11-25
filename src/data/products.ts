import lampImg from '../assets/img/products/lamp.png';
import pillowImg from '../assets/img/products/pillow.png';
import chairImg from '../assets/img/products/chair.png';
import plateImg from '../assets/img/products/plate.png';
import lightImg from '../assets/img/products/light.png';
import optimizeImg from '../assets/img/products/optimize.webp';
import shelfImg from '../assets/img/products/shelf.webp';
import holderImg from '../assets/img/products/holder.webp';
import hookImg from '../assets/img/products/hook.webp';
import toyImg from '../assets/img/products/toy.jpg';
import frogImg from '../assets/img/products/frog.jpg';
import pannoImg from '../assets/img/products/panno.jpg';
import lampaZefirkaImg from '../assets/img/products/lampa-zefirka.jpg';
import podushkaImg from '../assets/img/products/podushka-kovrovaya-vyshivk.jpg';
import candleImg from '../assets/img/products/candle.jpg';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Светильник настольный',
    category: 'Освещение',
    price: 2199,
    image: lampImg,
  },
  {
    id: '2',
    name: 'Комплект постельного белья',
    category: 'Спальня',
    price: 3499,
    image: pillowImg,
  },
  {
    id: '3',
    name: 'Стул обеденный',
    category: 'Мебель',
    price: 5199,
    image: chairImg,
  },
  {
    id: '4',
    name: 'Тарелка десертная',
    category: 'Посуда',
    price: 650,
    image: plateImg,
  },
  {
    id: '5',
    name: 'Светильник подвесной',
    category: 'Освещение',
    price: 650,
    image: lightImg,
  },
  {
    id: '6',
    name: 'Картина',
    category: 'Декор',
    price: 1650,
    image: optimizeImg,
  },
  {
    id: '7',
    name: 'Полка для ванной',
    category: 'Ванная',
    price: 845,
    image: shelfImg,
  },
  {
    id: '8',
    name: 'Держатель для полотенец',
    category: 'Ванная',
    price: 845,
    image: holderImg,
  },
  {
    id: '9',
    name: 'Крючок для хранения',
    category: 'Хранение',
    price: 135,
    image: hookImg,
  },
  {
    id: '10',
    name: 'Домовой',
    category: 'Декор',
    price: 2300,
    image: toyImg,
  },
  {
    id: '11',
    name: 'Денежная жаба',
    category: 'Декор',
    price: 11000,
    image: frogImg,
  },
  {
    id: '12',
    name: 'Панно керамика',
    category: 'Декор',
    price: 33000,
    image: pannoImg,
  },
  {
    id: '13',
    name: 'Настольная лампа',
    category: 'Освещение',
    price: 1800,
    image: lampaZefirkaImg,
  },
  {
    id: '14',
    name: 'Декоративная подушка',
    category: 'Декор',
    price: 2500,
    image: podushkaImg,
  },
  {
    id: '15',
    name: 'Свеча',
    category: 'Декор',
    price: 1800,
    image: candleImg,
  },
];
