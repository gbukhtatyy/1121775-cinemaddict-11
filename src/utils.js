/**
* Получение случайного числа в заданном диапозоне
*
* @param {number} max максимальное значение
* @param {number} min минимальное значение
* @return {number} случайное значение в заданных диапозонах
*/
export const getRandomInt = (max, min) => {
  max = max ? max : 2;
  min = min ? min : 0;

  return Math.floor(Math.random() * Math.floor(max - min)) + min;
};

/**
 * Получение случайного элемента из массива
 * @param {Array} array
 * @return {*} случайных элемент массива
 */
export const getRandomElementArray = (array) => {
  return array[getRandomInt(array.length)];
};

/**
 * Получение перемешанного массива
 * @param {Array} array исходный массив
 * @return {Array} перемешанный массив
 */
export const shuffleArray = (array) => {
  return array.slice(0).sort(function () {
    return Math.random() - 0.5;
  });
};

/**
 * Получение amount случайных элементов из массива array
 * @param {Array} array исходный массив
 * @param {number} amount кол-во случайных элементов
 * @return {Array} массив случайных элементов из массива array
 */
export const getRandomElementsArray = (array, amount) => {
  amount = amount ? amount : 1;
  return shuffleArray(array).slice(0, amount);
};
