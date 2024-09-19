class PubSub {
    constructor() {
        this.subscribers = {};
    }

    subscribe(event, subscriber) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = new Set();
        }
        this.subscribers[event].add(subscriber);
    }

    unsubscribe(event, subscriber) {
        if (this.subscribers[event]) {
            this.subscribers[event].delete(subscriber);

            if (this.subscribers[event].size === 0) {
                delete this.subscribers[event];
            }
        }
    }

    publish(event, msg) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(subscriber => subscriber.update(msg));
        }
    }
}

class Publisher {
    constructor(event) {
        this.event = event;
    }

    publish(pubSub, msg) {
        pubSub.publish(this.event, msg);
    }
}

class Subscriber {
    constructor(name) {
        this.name = name;
    }

    subscribe(pubSub, event) {
        pubSub.subscribe(event, this);
    }

    unsubscribe(pubSub, event) {
        pubSub.unsubscribe(event, this);
    }

    update(msg) {
        console.log(`${this.name} receive msg: ${msg}`);
    }
}


const pubSub = new PubSub()
const publisher1 = new Publisher('publisher1')
const publisher2 = new Publisher('publisher2')
const subscriber1 = new Subscriber('subscriber1')
const subscriber2 = new Subscriber('subscriber2')
const subscriber3 = new Subscriber('subscriber3')
subscriber1.subscribe(pubSub, publisher1.event)
subscriber2.subscribe(pubSub, publisher1.event)
subscriber3.subscribe(pubSub, publisher2.event)
publisher1.publish(pubSub, 'hello world')
publisher2.publish(pubSub, 'hello world again')
subscriber1.unsubscribe(pubSub, publisher1.event)
publisher1.publish(pubSub, 'hello world again again')
publisher2.publish(pubSub, 'hello world again again again')
