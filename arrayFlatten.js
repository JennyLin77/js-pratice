function flatten1(arr) {
    return arr.flat(Infinity);
}

function flatten2(arr) {
    return arr.reduce(
        (res, item) => res.concat(Array.isArray(item) ? flatten2(item) : item),
        []
    );
}

function flatten3(arr) {
    const stack = [...arr];
    const res = [];
    while(stack.length) {
        const item = stack.shift();
        if (Array.isArray(item)) {
            stack.unshift(...item);
        } else {
            res.push(item);
        }
    }
    return res;
};

const arr = [1, 2, [3], [4, 5, 6, [7, [8, 9, 10]]]];
console.log(`flatten1: ${flatten1(arr)}`);
console.log(`flatten2: ${flatten2(arr)}`);
console.log(`flatten3: ${flatten3(arr)}`);