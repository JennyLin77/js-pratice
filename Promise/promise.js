class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCbs = [];
        this.onRejectedCbs = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e);
        }
    }

    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.onFulfilledCbs.forEach(cb => cb(this.value));
        }
    }

    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedCbs.forEach(cb => cb(this.reason));
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        return new MyPromise((resolve, reject) => {
            const fulfilledCb = () => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }

            const rejectedCb = () => {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }

            if (this.state === 'fulfilled') {
                setTimeout(fulfilledCb);
            } else if (this.state === 'rejected') {
                setTimeout(rejectedCb);
            } else if (this.state === 'pending') {
                this.onFulfilledCbs.push(fulfilledCb);
                this.onRejectedCbs.push(rejectedCb);
            }
        })
    }

    catch(errorCb) {
        return this.then(undefined, errorCb);
    }
}



const promise = new MyPromise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
        if (Math.random() >= 0.) {
            resolve('操作成功');
        } else {
            reject('操作失败');
        }
    }, 1000);
});

// 添加成功和失败的回调函数
const promise2 = promise
    .then((res) => {
        console.log(`res: ${res}`);
        return 1;
    })
    .then((res) => {
        console.log(`res: ${res}`);
        return 2;
    })
    .catch((err) => {
        console.log(`err: ${err}`);
    });

setTimeout(() => {
    console.log(promise2);
}, 3000);

// 成功时结果
// res: 操作成功
// res: 1
// MyPromise {
//   state: 'fulfilled',
//   value: 2,
//   reason: undefined,
//   onFulfilledCallbacks: [],
//   onRejectedCallbacks: []
// }

// 失败时结果
// err: 操作失败
// MyPromise {
//   state: 'fulfilled',
//   value: undefined,
//   reason: undefined,
//   onFulfilledCallbacks: [],
//   onRejectedCallbacks: []
// }