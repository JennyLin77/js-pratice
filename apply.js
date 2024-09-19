Function.prototype.myApply = function (thisArg, args) {
    if (typeof this !== 'function') {
        throw new TypeError('被调用对象必须是函数');
    }
    if (args && !Array.isArray(args)) {
        throw new TypeError('第2个参数必须是数组');
    }
    // globalThis: es11出的，可通过其访问全局对象
    const context = thisArg || globalThis;
    const _args = args || [];
    // 防止context中key冲突
    const fn = Symbol('fn');
    // 被调用函数上下文绑定context
    context[fn] = this;
    const res = context[fn](..._args);
    delete context[fn];
    return res;
}


const test = {
    name: "xxx",
    hello: function () {
        console.log(`hello,${this.name}!`);
    },
};
const obj = {
    name: "world"
};
test.hello.myApply(obj); //hello,world!
test.hello.apply(obj); //hello,world!
const arr = [2, 3, 6, 5, 1, 7, 9, 5, 0]
console.log(Math.max.myApply(null, arr)); //9
console.log(Math.max.apply(null, arr)); //9