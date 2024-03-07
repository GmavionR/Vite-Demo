// type Person = {
//     name: string;
//     age: number;
//     address?: string;
// }

// import {ref} from 'vue'


type A = string;
declare type B = string | number;

function addWithoutDeclare(a: number, b: number): number {
    return a + b;
};
declare function addWithDeclare(a: number, b: number): number;

//声明一个变量
let varA;
declare let varB;


class Person {
    [key: string]: any;
    constructor(name: string, age: number);
}

interface MetaData {
    name: import('vue').Student;
}
