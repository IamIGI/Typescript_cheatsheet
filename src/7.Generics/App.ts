// Generics - you declare what is the content of object / array / Promise etc
// const names: Array<string> = [];
// names[0].split(' ');

// const promise: Promise<string> = new Promise( (resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     },2000)
// });

// promise.then(data => {
//     data.split(' ');
// })

//Create own generic functions

// function merge<T extends Object, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }

// const result1 = merge({ name: 'Igor', hobbies: ['Drinking'] }, 32);
// console.log(result1.name);

//Adding constraints to generic functions (this is "extends")
function merge<T extends Object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const result1 = merge({ name: 'Igor', hobbies: ['Drinking'] }, { number: 32 });
console.log(result1);

interface Lengthy {
    length: number; //for '.length ' inner js function
    //we say there that element will have length property and it will return number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = `Got 1 element`;
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('dkasjdklas'));

//the 'keyof' constraints
//keyof  - this variable is the key of pointer object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`; //this error said: We don't know if is the object will have that key in it
}

extractAndConvert({ name: 'Max' }, 'name');

//Generics classes
// you got a choose once what type of data you want to use
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

//you are passing there type to T generics type fo this class
const textStorage = new DataStorage<string>();
textStorage.addItem('Igor');
textStorage.addItem('Manu');
textStorage.removeItem('Igor');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(45);
numberStorage.removeItem(10);
console.log(numberStorage.getItems());

//we declare in with which instance class can work
// const objStorage = new DataStorage<object>();
// const igorObj = { name: 'Igor' };
// objStorage.addItem(igorObj);
// objStorage.addItem({ name: 'Manu' });
// objStorage.removeItem(igorObj);
// console.log(objStorage.getItems());

//generics utilities types

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseFoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; //partial says, that option of given interface are optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}
// not allowed to change properties
const names: Readonly<string[]> = ['Max', 'Igor'];
// names.push('Manu')
// names.pop();

//generics vs unions types
