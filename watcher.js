class Subject {
    constructor() {
        this.watchers = [];
    }

    subscribe(watcher) {
        this.watchers.push(watcher);
    }

    unsubscribe(watcher) {
        this.watchers = this.watchers.filter(watcherItem => watcherItem !== watcher);
    }

    notify(msg) {
        this.watchers.forEach(watcher => watcher.update(msg));
    }
}

class Watcher {
    constructor(name) {
        this.name = name;
    }

    update(msg) {
        console.log(`${this.name} receive msg: ${msg}`);
    }
}

const subject = new Subject()
const watcher1 = new Watcher('observer1')
const watcher2 = new Watcher('observer2')
subject.subscribe(watcher1)
subject.subscribe(watcher2)
subject.notify('hello world')
subject.unsubscribe(watcher1)
subject.notify('hello world again')