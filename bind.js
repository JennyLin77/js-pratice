Function.prototype.myBind = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('被调用对象必须是函数');
    }
    const context = thisArg || globalThis;
    // 保存被调用函数
    const _this = this;

    function fn(...innerArgs) {
        return _this.apply(
            // 若返回函数作为构造函数时，因为new优先级高，上下文会指向该实例
            this instanceof fn ? this : context,
            [...args, ...innerArgs],
        );
    }
    const middleFn = function () {};
    middleFn.prototype = _this.prototype;
    // 为避免篡改被调用函数的原型，增加 middleFn为中介
    fn.prototype = new middleFn();
    return fn;
}


const test = {
    name: "xxx",
    hello: function (a, b, c) {
        console.log(`hello,${this.name}!`, a + b + c);
    },
};
const obj = {
    name: "world"
};
let hello1 = test.hello.myBind(obj, 1);
let hello2 = test.hello.bind(obj, 1);
hello1(2, 3) //hello,world! 6
hello2(2, 3) //hello,world! 6
console.log(new hello1(2, 3));
//hello,undefined! 6
// hello {}
console.log(new hello2(2, 3));
//hello,undefined! 6
// hello {}