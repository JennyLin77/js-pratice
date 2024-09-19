class EventEmitter {
    constructor() {
        this.handlers = {};
    }

    on(event, cb) {
        if(!this.handlers[event]) {
            this.handlers[event] = new Set();
        }
        this.handlers[event].add(cb);
    }

    off(event, cb) {
        if (this.handlers[event]) {
            this.handlers[event].delete(cb);
            if (this.handlers[event].size === 0) {
                delete this.handlers[event];
            }
        }
    }

    emit(event, param) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(handler => handler(param));
        }
    }

    once(event, cb) {
        const fn = (param) => {
            cb(param);
            this.off(event, fn);
        }
        this.on(event, fn);
    }
}


// 创建一个事件监听器
const eventEmitter = new EventEmitter()
// 定义一个事件
const eventName = 'click'
// 定义一个事件监听器
const listener = (args) => {
    console.log(`receive event: ${args}`)
}
// 监听事件
eventEmitter.on(eventName, listener)
// 触发事件
eventEmitter.emit(eventName, 'hello world')
eventEmitter.emit(eventName, 'hello world again')
// 取消监听事件
eventEmitter.off(eventName, listener)
eventEmitter.emit(eventName, 'hello world again again')
// 只监听一次事件
eventEmitter.once(eventName, listener)
eventEmitter.emit(eventName, 'hello world again again again')
eventEmitter.emit(eventName, 'hello world again again again again')
