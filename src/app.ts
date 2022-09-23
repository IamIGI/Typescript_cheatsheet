const add = (a: number, b: number = 1) => a + b; //default value for b;
const printOutput: (a: number | string) => void = (output) => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', (event) => console.log(event));
}

printOutput(add(5)); // 5 + 1

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

console.log(activeHobbies);

const personObj = {
    name: 'Igor',
    age: 30,
};

const copiedPerson = { ...personObj };
console.log(copiedPerson);

//restParameters =  spreads parameters
const add4 = (...numbers: number[]) => {
    return numbers.reduce((curResult, curNumber) => {
        return curResult + curNumber;
    }, 0);
};

const addedNumbers = add4(4, 5, 6, 19);
console.log(addedNumbers);
