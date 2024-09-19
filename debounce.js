var fn = function () {
    console.log('boom')
}

function debounce (fn, interval) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, interval);
    }
}

setInterval(debounce(fn, 500), 1000) // 第一次在1500ms后触发，之后每1000ms触发一次

// setInterval(debounce(fn, 2000), 1000) // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）