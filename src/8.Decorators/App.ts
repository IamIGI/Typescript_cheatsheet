//Decorator execute when you define class.
//They do not execute when you call a method / work with property
//-------------------------

import { string } from 'yup';
import { create } from 'yup/lib/Reference';

// function Logger(constructor: Function) {
//     // decorator are often wrote  with capital letter
//     console.log('Logging...');
//     console.log(constructor);
// }

function Logger(logString: string) {
    // decorator are often wrote  with capital letter
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

//Advanced decorator
function WithTemplate(template: string, hookId: string) {
    return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
        //return new class
        return class extends originalConstructor {
            constructor(..._: any[]) {
                //I know I don't use it, so I use "_" to tell typescript, don't throw me that warning
                super();
                console.log('Rendering template');
                //I am not interested in constructor, so i am going for : "_"
                const hookEl = document.getElementById(hookId);
                const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = p.name;
                }
            }
        };
    };
}

//Adding multiple decorators

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object </h1>', 'app') //decorators execute bottom up
class Person1 {
    name = 'Igor';

    constructor() {
        console.log('Creating person object...');
    }
}

const pers = new Person1();

console.log(pers);

//Diving into Property Decorators

//adding decorator to property (received two arguments)
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

//Accessor  decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//Method decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log //adding decorator to property
    title: string;
    private _price: number;
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive number');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }
    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

//Creating and "Autobind" decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            //getter method
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}
const p = new Printer();

const button1 = document.querySelector('button')!;
button1.addEventListener('click', p.showMessage); //using bind make to "refer to the this instance not to class"

//Validation with decorators

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required'],
    };
}

function PositiveNUmber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive'],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNUmber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
    }
    console.log(createdCourse);
});
