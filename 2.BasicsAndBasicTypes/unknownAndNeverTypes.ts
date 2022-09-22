//unknown is saying: I don't know yet what type this variable will have
//So I will check it before I assigns value of it somewhere
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}

//never - we never will be returning from that function
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}

generateError('An error occured', 500);
