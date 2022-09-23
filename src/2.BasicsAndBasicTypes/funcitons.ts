function add3(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(`Result addAndHandle: ${result}`);
});

printResult(add3(5, 12));

// let combineValues: () => number; //creating a function type (take no parameter and return number)
let combineValues: (a: number, b: number) => number;

combineValues = add3;

console.log(combineValues(8, 8));
