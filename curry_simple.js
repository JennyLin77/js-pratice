//一个接收三个参数的普通函数
function sum(a,b,c) {
    console.log(a+b+c)
}

//用于将普通函数转化为柯里化版本的工具函数
function curry(fn, fnLen = fn.length) {
    return _curry.call(this, fn, fnLen);
}

function _curry(fn, fnLen, ...params) {
    return function(...args) {
        const _args = [...params, ...args];
        if (_args.length >= fnLen) {
            return fn.apply(this, _args);
        }
        return _curry.call(this, fn, fnLen, ..._args);
    }
}

//获取一个柯里化后的函数
let _sum = curry(sum);

//返回一个接收第二个参数的函数
let A = _sum(1);
//返回一个接收第三个参数的函数
let B = A(2);
//接收到最后一个参数，将之前所有的参数应用到原函数中，并运行
B(3)    // print : 6