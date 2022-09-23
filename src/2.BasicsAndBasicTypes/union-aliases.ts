type Combinable = number | string; //custom aliases
type ConversionDescription = 'as-number' | 'as-text';

function combine(n1: Combinable, n2: Combinable, resultConversion: ConversionDescription) {
    //allow just strings with given value
    let result;
    if ((typeof n1 === 'number' && typeof n2 === 'number') || resultConversion === 'as-number') {
        result = +n1 + +n2;
    } else {
        result = n1.toString() + n2.toString();
    }

    return result;
    // if (resultConversion === 'as-number') {
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}

const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);

const combinedStringAges = combine('31', '51', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
