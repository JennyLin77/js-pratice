Promise.myAny = function (promises) {
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
        throw new TypeError('param promises must be iterable');
    }

    const arr = [];
    let cnt = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((item, i) => {
            Promise.resolve(item)
                .then(resolve)
                .catch(error => {
                    arr[i] = error;
                    cnt++;
                    if (cnt === promises.length) reject({ errors: arr });
                });
        });
    });
}


// 测试用例
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 延时一秒')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3 延时两秒')
    }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5 rejected 延时1.5秒')
    }, 1500)
})

// 所有 Promise 都成功
Promise.myAny([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p1

// 两个 Promise 成功
Promise.myAny([p1, p2, p4])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p1

// 只有一个延时成功的 Promise
Promise.myAny([p2, p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p2 延时1秒

// 所有 Promise 都失败
Promise.myAny([p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // AggregateError: All promises were rejected