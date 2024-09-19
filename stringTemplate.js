// 支持 {{}} 变量写法
function replaceTpl1(tpl, data) {
    return tpl.replace(/\{\{([0-9a-zA-Z_]+)\}\}/g, (_, key) => data[key] ?? '');
}

// 支持 ${} 变量写法
function replaceTpl2(tpl, data) {
    return tpl.replace(/\$\{([0-9a-zA-Z_]+)\}/g, (_, key) => data[key] ?? '');
}

// 支持 #{} 变量写法
function replaceTpl3(tpl, data) {
    return tpl.replace(/#\{([0-9a-zA-Z_]+)\}/g, (_, key) => data[key] ?? '');
}

console.log(replaceTpl1('我是{{Name_1}}', {Name_1: 'Tom1'}));
console.log(replaceTpl2('我是${Name_1}', {Name_1: 'Tom2'}));
console.log(replaceTpl3('我是#{Name_1}', {Name_1: 'Tom3'}));