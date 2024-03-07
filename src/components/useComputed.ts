

// export function useComputed(fn:Function) {

//     return function(...args:any[]){
//         return fn(...args)
//     }

// }

import { computed } from "vue"


export function useComputed<T extends (...args:any[])=>any>(fn: T){
    return function (...args:Parameters<T>){

        
        const result= computed(()=>fn(...args))

        return result;
    }
}