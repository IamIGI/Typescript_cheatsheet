type User_z = { name: string; age: number };
const u1: User_z = { name: 'Max', age: 30 }; // this works!

type User = { name: string; age: number };

function greet(user: User) {
    console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
    return checkAge > user.age;
}
