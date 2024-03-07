
namespace JSONUtils {
    export function parseToStr(obj: object): string {
        return JSON.stringify(obj);
    }
    function parseA(): string {
        return "hello"
    }
}


namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }
}

console.log(JSONUtils.parseToStr({name:"zhangsan"}));