function double(m) {
    return m * 2
}

function square(n) {
    return n ** 2
}

function add(n) {
    return n + 10;
}

// 一般写法
console.log(square(double(1))); // 4

function compose(...fnArr){
    for (let fn of fnArr) {
        if (typeof fn !== 'function') {
            throw new TypeError('fn must be function');
        }
    }

    return (args) => {
        // fnArr为空数组，则返回args；
        // args为 undefined，则返回 undefined
        return fnArr.reduce((params, a) => a(params), args);
    }
}

// 调用组合函数
var newFn = compose(double, square, add)
console.log(newFn(1)) // 14