function curry(fn, fnLen = fn.length, placeholder = '_') {
    return _curry.call(this, fn, fnLen, placeholder);
}

function _curry(fn, fnLen,placeholder, params = [], placeholders = []) {
    return function(...args) {
        const _params = params.slice();
        const _placeholders = placeholders.slice();
        // console.log('_params', _params);
        // console.log('_placeholders', _placeholders);
        args.forEach((arg) => {
            if (arg !== placeholder && !placeholders.length) {
                _params.push(arg);
            } else if (arg !== placeholder && placeholders.length) {
                const idx = placeholders.shift();
                _params[idx] = arg;
                _placeholders.splice(_placeholders.indexOf(idx), 1);
            } else if (arg === placeholder && !placeholders.length) {
                _params.push(arg);
                _placeholders.push(_params.length - 1);
            } else {
                placeholders.shift();
            }
        });
        if (_params.length >= fnLen && _params.slice(0, fnLen).every(param => param !== placeholder)) {
            return fn.apply(this, _params);
        }
        return _curry.call(this, fn, fnLen, placeholder, _params, _placeholders);
    }
}

let fn = function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
}

let _ = {}; // 定义占位符
let _fn = curry(fn,5,_);  // 将函数柯里化，指定所需的参数个数，指定所需的占位符

_fn(1, 2, 3, 4, 5);                 // print: 1,2,3,4,5
_fn(_, 2, 3, 4, 5)(1);              // print: 1,2,3,4,5
_fn(1, _, 3, 4, 5)(2);              // print: 1,2,3,4,5
_fn(1, _, 3)(_, 4,_)(2)(5);         // print: 1,2,3,4,5
_fn(1, _, _, 4)(_, 3)(2)(5);        // print: 1,2,3,4,5
_fn(_, 2)(_, _, 4)(1)(3)(5);        // print: 1,2,3,4,5