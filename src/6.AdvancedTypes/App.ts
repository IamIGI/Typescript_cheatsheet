type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

//let's combine above 2 types into one
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Igor',
    privileges: ['creat-server'],
    startDate: new Date(),
};

type Combinable1 = string | number;
type Numeric = number | boolean;

type Universal = Combinable1 & Numeric;

//function overloads
function add_1(a: number, b: number): number; //set what type will be the result
function add_1(a: number, b: string): string;
function add_1(a: string, b: string): string;
function add_1(a: Combinable1, b: Combinable1) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add_1(5, 'Schwarz');
result.split(' ');

//Optional chaining
const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserData?.job?.title);

//nullish coalescing -- if you don't want what type of response expect

const userInput_1 = null;

const storedData = userInput_1 ?? 'DEFAULT'; // if null or undefined, user value after question marks

console.log(storedData);

//Comment to 25 line from there to work on code beneath

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//     console.log(`Name: ${emp.name}`);
//     if ('privileges' in emp) {
//         console.log(`Privileges: ${emp.privileges}`);
//     }

//     if ('startDate' in emp) {
//         console.log(`Privileges: ${emp.startDate}`);
//     }
// }

// printEmployeeInformation(e1);

// class Car {
//     drive() {
//         console.log('Driving....');
//     }
// }

// class Truck {
//     drive() {
//         console.log('Driving a truck....');
//     }

//     loadCargo(amount: number) {
//         console.log('Loading cargo....' + amount);
//     }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

//type guard - cehcking types before you try to do something with the values

// function useVehicle(vehicle: Vehicle) {
//     vehicle.drive();
//     //type guard (works only if class is declared)
//     if (vehicle instanceof Truck) {
//         vehicle.loadCargo(1000);
//     }
// }

// useVehicle(v1);
// useVehicle(v2);

// //DiscriminatedUnions
// interface Bird {
//     type: 'bird';
//     flyingSpeed: number;
// }

// interface Horse {
//     type: 'horse';
//     runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//     let speed;
//     switch (animal.type) {
//         case 'bird':
//             speed = animal.flyingSpeed;
//             break;
//         case 'horse':
//             speed = animal.runningSpeed;
//     }
//     console.log(`Moving withs peed: ` + speed);

//     // Do not work with interfaces
//     // if (animal instanceof Bird) console.log(`Moving withs peed: ` + animal.flyingSpeed);
// }

// moveAnimal({ type: 'bird', flyingSpeed: 14 });

// //TypeCasting
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; // "!" - cannot be null or undefined
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement; // "!" - cannot be null or undefined

// userInputElement.value = 'Hi there!';

// //Index Properties
// interface ErrorContainer {
//     [prop: string]: string; //every argument key must be a string, and it's value must be a string also
// }

// const errorBag: ErrorContainer = {
//     email: 'Not a valid email',
//     username: 'Must start with Capital character!',
// };
