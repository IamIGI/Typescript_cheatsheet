abstract class Department {
    //abstract classes force to use abstract methods
    //abstract classes are just to be inherited from
    static fiscalYear = 2020;
    // private readonly name: string; //default is public type
    // private employees: string[] = [];
    // private id: string;

    // constructor(n: string, _id: string) {    //define what is a MUST to define when initializing class
    //     this.name = n;
    //     this.id = _id;
    // }

    //You can define constructor variables inside constructor
    // private employees: string[] = []; // just this class can access this variable
    protected employees: string[] = []; // this class and classes that inherit from this class
    constructor(protected readonly id: string, public name: string) {}

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        // this.id = 'd2'; //can't do it cuz this is 'readonly' variable
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    // if you do not add constructor then default (Department) constructor will be used
    constructor(id: string, public admins: string[]) {
        super(id, 'IT'); // super calls construction from base class (Department)
        //thanks to that you inherit class arguments
        this.admins = admins;
    }

    describe() {
        console.log(`It department: (${this.id})`);
    }
}

class AccountDepartment extends Department {
    private lastReport: string;
    private static instance: AccountDepartment;

    get mostRecentReport() {
        //gather method have to return something
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('ErrMsg: No report found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass a value');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountDepartment('d3', []);
        return this.instance;
    }

    describe() {
        console.log('Acocunting Department - ID: ' + this.id);
    }

    addEmployee(name: string) {
        if (name === '') {
            console.log({ error: 'Empty string', message: "Can't save empty string field" });
            return;
        }
        this.employees.push(name);
    }

    getEmployees() {
        console.log(this.employees);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    getReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['IgorAdmin']);
it.addEmployee('Max');
it.addEmployee('Edward');
// it.employees[2] = 'Anna'; //Won't work cuz employees is a private variable
// it.describe();
it.name = 'NEW NAME';
// it.printEmployeeInformation();

// const accounting = new AccountDepartment('d2', []);
const accounting = AccountDepartment.getInstance();
accounting.mostRecentReport = 'Raport nr.1';
accounting.addReport('Raport added');
console.log(accounting.mostRecentReport); //this is getter, you do no use there ();

accounting.getReports();
accounting.addEmployee('Max');
accounting.getEmployees();
accounting.describe();
// console.log(it);
// console.log(accounting);

// const accountingCopy = { name: 'Dummy', describe: accounting.describe};

// accountingCopy.describe();
