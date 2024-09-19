Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('被调用对象必须是函数');
    }
    const context = thisArg || globalThis;
    // 使用Symbol防止key冲突；
    const fn = Symbol('fn');
    // 把执行函数的上下文绑定为 context；
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}



const test = {
    name: "xxx",
    hello: function () {
        console.log(`hello,${this.name}!`);
    },
    add: function (a, b) {
        return a + b;
    },
};
const obj = {
    name: "world"
};
test.hello.myCall(obj); //hello,world!
test.hello.call(obj); //hello,world!
console.log(test.add.myCall(null, 1, 2)); //3
console.log(test.add.call(null, 1, 2)); //3