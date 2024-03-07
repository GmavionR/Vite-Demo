import {b,changeB} from './a.js';

console.log(b)
changeB(20)
console.log(b)
console.log("b.js this",this);
console.log( Array.from({
    length: 3
  }, (_, index) => {
    console.log("_",_);
    return {
      index: index,
      name: 'name', //
      element: _,
    }
  }));