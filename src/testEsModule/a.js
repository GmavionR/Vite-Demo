
let a=10;


export let  b=18;

export function changeB(newB){
    b=newB;
    console.log("this is module a.js",b)
}


let obj={
    name:"张三",
    age:"12",
    married:false
}


console.log(this);
console.log(JSON.stringify(obj));


