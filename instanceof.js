function myInstanceof(a, b) {
    if (!b || !['object', 'function'].includes(typeof b)) {
        throw new Error('第2个参数必须是object');
    }
    if (!a || !['object', 'function'].includes(typeof a)) {
        return false;
    }
    let curProto = Object.getPrototypeOf(a);
    while(curProto) {
        if (curProto === b.prototype) {
            return true;
        }
        curProto = Object.getPrototypeOf(curProto);
    }
    return false;
}

class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(myInstanceof(dog, Dog)); // true
console.log(myInstanceof(dog, Animal)); // true
console.log(myInstanceof(dog, Object)); // true
console.log(myInstanceof(dog, String)); // false
