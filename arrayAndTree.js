// 情况1：知道根节点为 0
function arrayToTree1(array) {
    const PID = 0;
    const tree = {};
    const res = [];
    array.forEach(item => {
        const newItem = {
            ...item,
            children: tree[item.id]?.children || [],
        };
        tree[newItem.id] = newItem;
        if (newItem.pid === PID) {
            res.push(newItem);
        } else {
            if (!tree[newItem.pid]) {
                tree[newItem.pid] = { children: [] };
            }
            tree[newItem.pid].children.push(newItem);
        }
    });
    return res;
}

// 情况2: pid未知
function arrayToTree2(array) {
    const tree = {};
    const res = [];

    array.forEach(item => {
        tree[item.id] = {
            ...item,
            children: [],
        }
    });

    array.forEach(item => {
        const newItem = tree[item.id];
        if (tree[newItem.pid]) {
            tree[newItem.pid].children.push(newItem);
        } else  {
            res.push(newItem);
        }
    });

    return res;
}

function treeToArray(tree) {
    return tree.reduce((res, item) => {
        const { children, ...newItem } = item;
        return res.concat(newItem, children?.length ? treeToArray(children) : [])
    }, []);
}


const arr = [{
        id: 1,
        name: '1',
        pid: 0
    },
    {
        id: 2,
        name: '2',
        pid: 1
    },
    {
        id: 3,
        name: '3',
        pid: 1
    },
    {
        id: 4,
        name: '4',
        pid: 3
    },
    {
        id: 5,
        name: '5',
        pid: 3
    },
]

const tree = [{
    "id": 1,
    "name": "1",
    "pid": 0,
    "children": [{
            "id": 2,
            "name": "2",
            "pid": 1,
            "children": []
        },
        {
            "id": 3,
            "name": "3",
            "pid": 1,
            "children": [{
                    "id": 4,
                    "name": "4",
                    "pid": 3,
                    "children": []
                },
                {
                    "id": 5,
                    "name": "5",
                    "pid": 3,
                    "children": []
                }
            ]
        }
    ]
}]

console.log(`arrayToTree1: ${JSON.stringify(arrayToTree1(arr))}`);
console.log(`arrayToTree2: ${JSON.stringify(arrayToTree2(arr))}`);
console.log(`treeToArray: ${JSON.stringify(treeToArray(tree))}`);