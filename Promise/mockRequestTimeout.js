// 请求超时报错，否则返回请求结果

const handleRequest= (request, timeout = 3000) => {
    return Promise.race([
        request,
        new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('request timeout'));
            }, timeout);
        }),
    ]);
}

const req = (costTime = 5000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('123');
        }, costTime);
    })
}

// 测试用例
handleRequest(req())
    .then(res => console.log('用例1', res))
    .catch(err => console.error('用例1', err)); // 用例1 Error: request timeout

handleRequest(req(1000))
    .then(res => console.log('用例2', res))  // 用例2 123
    .catch(err => console.error('用例2', err));