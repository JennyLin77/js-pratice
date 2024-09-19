// Promise.all
Promise.myAll = function (promises) {
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
        throw new TypeError('param promises must be iterable');
    }
    const arr = [];
    let cnt = 0;

    // 方法一 用catch 处理 rejected情况
    return new Promise((resolve, reject) => {
        promises.forEach((item, i) => {
            Promise.resolve(item)
                .then(res => {
                    arr[i] = res;
                    cnt++;
                    if (cnt === promises.length) resolve(arr);
                })
                .catch(reject);
        });
    });

    // 方法二 用then第2个参数 处理 rejected情况
    // return new Promise((resolve, reject) => {
    //     promises.forEach((item, i) => {
    //         Promise.resolve(item)
    //             .then((res) => {
    //                 arr[i] = res;
    //                 cnt++;
    //                 if (cnt === promises.length) resolve(arr);
    //             }, reject);
    //     });
    // });
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

// 所有 Promsie 都成功
Promise.myAll([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]

// 一个 Promise 失败
Promise.myAll([p1, p2, p4])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p4 rejected

// 一个延时失败的 Promise
Promise.myAll([p1, p2, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 1.5秒后打印 p5 rejected 延时1.5秒

// 两个失败的 Promise
Promise.myAll([p1, p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p4 rejected