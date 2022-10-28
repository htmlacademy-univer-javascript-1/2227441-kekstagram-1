import {getRandom} from './utils.js';

const DISCRIPTIONS_COUNT = 25;
const DISCRIPTIONS = [
  'Крутая картинка',
  'Прикольная пикча',
  'Хорошее фото',
  'Шедевральный снимок',
  'Шикарный вид',
  'Великолепный пейзаж',
  'Супер снимок',
  'Отличная фотография'
];
const NAMES = [
  'Иван',
  'Дмитрий',
  'Мария',
  'Александр',
  'Виктор',
  'Юлия',
  'Анастасия',
  'Ирина',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

function createDiscription() {
  const newId = getRandom(0, ids.length);
  ids = ids.splice(newId, 1);
  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: DISCRIPTIONS[getRandom(1, DISCRIPTIONS.length)],
    likes: getRandom(15, 200),
    comments: [{
      id: getRandom(1, 10000),
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: MESSAGES[getRandom(0, 5)],
      name: NAMES[getRandom(0, NAMES.length)],
    },
    {
      id: getRandom(1, 10000),
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: MESSAGES[getRandom(0, 5)],
      name: NAMES[getRandom(0, NAMES.length)],
    },
    {
      id: getRandom(1, 10000),
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: MESSAGES[getRandom(0, 5)],
      name: NAMES[getRandom(0, NAMES.length)],
    }],
  };
}

function createDiscriptions() {
  const discriptions = Array.from({length: DISCRIPTIONS_COUNT}, createDiscription);
  return discriptions;
}

export {createDiscriptions};
