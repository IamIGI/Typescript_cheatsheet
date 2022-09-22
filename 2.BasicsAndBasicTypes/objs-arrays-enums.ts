enum Role { ADMIN='Admin', READ_ONLY=100, AUTHOR='IgorAdmin' };

// const person: {
//     name: string,
//     age: number,
//     hobbies: string[]
//     roleTuple: [number, string]; // this is a tuple
//     role: STR
// }  = {
const person = {
    name: 'Igor',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    roleTuple: [2, 'author'],
    role: Role.AUTHOR
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];
// person.role[1] = 10;

console.log(person)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}