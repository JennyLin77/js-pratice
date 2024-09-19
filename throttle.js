let fn = () => {
    console.log('boom')
}

// date 的方式
function throttle(fn, interval) {
    let timer = 0;
    return function(...args) {
        const now = Date.now();
        if (now - timer > interval) {
            timer = now;
            fn.apply(this, args);
        }
    }
}

// timer 的方式
function throttle(fn, interval) {
    let timer;
    return function(...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, interval);
    }
}

setInterval(throttle(fn, 2000), 10)