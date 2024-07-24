/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие-либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {anyPass, allPass, pipe, propEq, equals, not, prop} from "ramda";

const isStarRed = propEq('star', 'red');
const isStarWhite = propEq('star', 'white');
const isSquareGreen = propEq('square', 'green');
const isSquareOrange = propEq('square', 'orange');
const isTriangleWhite = propEq('triangle', 'white');
const isTriangleGreen = propEq('triangle', 'green');
const isCircleWhite = propEq('circle', 'white');
const isCircleBlue = propEq('circle', 'blue');

const getColors = (figures) => {
    return Object.values(figures);
}

const greenFilter = (colors) => {
    return colors.filter((item) => item === 'green');
}
const redFilter = (colors) => {
    return colors.filter((item) => item === 'red');
}
const blueFilter = (colors) => {
    return colors.filter((item) => item === 'blue');
}
const orangeFilter = (colors) => {
    return colors.filter((item) => item === 'orange');
}

const getLength = (colors) => {
    return colors.length;
}

const oneMore = (l) => {
    return equals(l >= 1, true);
}
const twoMore = (l) => {
    return equals(l >= 2, true);
}
const exactlyTwo = (l) => {
    return equals(l === 2, true);
}
const threeMore = (l) => {
    return equals(l >= 3, true);
}
const exactlyFour = (l) => {
    return equals(l === 4, true);
}

const triangleLikeSquare = (figures) => {
    const triangle = prop('triangle', figures);
    const square = prop('square', figures);
    return equals(triangle, square);
}

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    return allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite])(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
    return pipe(getColors, greenFilter, getLength, twoMore)(figures);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    const redCount = pipe(getColors, redFilter, getLength)(figures);
    const blueCount = pipe(getColors, blueFilter, getLength)(figures);
    return equals(redCount, blueCount);
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (figures) => {
    return allPass([isCircleBlue, isStarRed, isSquareOrange])(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    const threeRed = pipe(getColors, redFilter, getLength, threeMore);
    const threeBlue = pipe(getColors, blueFilter, getLength, threeMore);
    const threeGreen = pipe(getColors, greenFilter, getLength, threeMore);
    const threeOrange = pipe(getColors, orangeFilter, getLength, threeMore);
    return anyPass([threeRed, threeBlue, threeGreen, threeOrange])(figures);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figures) => {
    const twoGreen = pipe(getColors, greenFilter, getLength, exactlyTwo);
    const oneMoreRed = pipe(getColors, redFilter, getLength, oneMore);
    return allPass([twoGreen, isTriangleGreen, oneMoreRed])(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
    return pipe(getColors, orangeFilter, getLength, exactlyFour)(figures);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (figures) => {
    console.log(figures.star)
    const notRedStar = pipe(isStarRed, not);
    const notWhiteStar = pipe(isStarWhite, not);
    return allPass([notRedStar, notWhiteStar])(figures);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
    return pipe(getColors, greenFilter, getLength, exactlyFour)(figures);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figures) => {
    const notWhiteTriangle = pipe(isTriangleWhite, not);
    return allPass([notWhiteTriangle, triangleLikeSquare])(figures);
};
