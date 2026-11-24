export type TeamMember = {
  num: string;
  title: string;
  github: string;
  githubUrl?: string;
  role: string;
  contribution: string;
  art: string;
};

export const team: TeamMember[] = [
  {
    num: '01',
    title: 'Участник 1',
    github: 'KateKurakina',
    githubUrl: 'https://github.com/KateKurakina',
    role: 'Екатерина Куракина',
    contribution:
      'Настройка проекта, каталог, карточки товаров, фильтрация по категориям и сортировка по цене.',
    art: 'pink',
  },
  {
    num: '02',
    title: 'Участник 2',
    github: 'Faratora',
    githubUrl: 'https://github.com/Faratora',
    role: 'Светлана Савина',
    contribution: 'Настройка проекта, страница "О нас", Страница корзины, промокод и сохранение корзины в localStorage.  ',
    art: 'olive',
  },
];
