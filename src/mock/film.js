import {getRandomInt, getRandomElementArray, getRandomElementsArray} from "../utils/common.js";

const PosterItems = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const TitleItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const CategoryItems = [
  `Action`,
  `Musical`
];

const AuthorItems = [
  `Author 1`,
  `Author 2`,
  `Author 3`,
  `Author 4`,
  `Author 5`
];

const CommentItems = [
  `Comment 1`,
  `Comment 2`,
  `Comment 3`,
  `Comment 4`,
  `Comment 5`
];

const EmojyItems = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    author: getRandomElementArray(AuthorItems),
    content: getRandomElementArray(CommentItems),
    emoji: getRandomElementArray(EmojyItems)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateFilm = () => {
  return {
    id: String(new Date() + Math.random()),
    poster: getRandomElementArray(PosterItems),
    title: getRandomElementArray(TitleItems),
    rating: getRandomInt(100, 20) / 10,
    year: getRandomInt(2020, 1920),
    minutes: getRandomInt(120, 180),
    category: getRandomElementArray(CategoryItems),
    description: getRandomElementsArray(DescriptionItems, getRandomInt(5)),
    comments: generateComments(getRandomInt(15)),
    isWatchlist: getRandomInt(2),
    isWatched: getRandomInt(2),
    isFavorite: getRandomInt(2)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
