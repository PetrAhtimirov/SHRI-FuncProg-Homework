/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {pipe, equals, allPass, prop, not} from "ramda";

const api = new Api();

/**
* Я – пример, удали меня
*/
const wait = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const getValue = (obj) => {
    return prop('value', obj);
}
const getWriteLog = (obj) => {
    return prop('writeLog', obj);
}

const getHandleError = (obj) => {
    return prop('handleError', obj);
}

const lessTenSymbols = (string) => {
    return equals(string.length < 10, true);
}
const moreTwoSymbols = (string) => {
    return equals(string.length > 2, true);
}

const positiveNum = (string) => {
    return equals(string[0] !== '-', true);
}

const fromInt = (string) => {
    return /^[0-9]+(\.[0-9]+)?$/.test(string);
}

const toNumber = (value) => {
    return +value;
}

const roundNumber = (value) => {
    return Math.round(value);
}
const toBin = async (value) => {
    const result = api.get('https://api.tech/numbers/base', {from: 10, to: 2, number: value});
    return await result;
}

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const mWriteLog = (value) => {
        writeLog(value);
        return value;
    }
    const validate = (value) => {
        if (not(allPass([lessTenSymbols, moreTwoSymbols, positiveNum, fromInt])(value))) {
            handleError('ValidationError');
        }
        return value;
    }

    pipe(getValue, mWriteLog, validate, toNumber, roundNumber, mWriteLog, toBin, mWriteLog)({value, writeLog, handleSuccess, handleError});



    wait(2500).then(() => {
        writeLog('SecondLog')

        return wait(1500);
    }).then(() => {
        writeLog('ThirdLog');

        return wait(400);
        }).then(() => {
            handleSuccess('Done');
        });
    }

export default processSequence;
