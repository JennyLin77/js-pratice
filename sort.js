function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let flag = true;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}

var arr = [3, 2, 4, 9, 1, 5, 7, 6, 8];
console.log(arr);
console.log(`冒泡排序: ${bubbleSort(arr)}`);


function selectSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min != i) {
            [arr[min], arr[i]] = [arr[i], arr[min]];
        }
    }
    return arr;
}
console.log(`选择排序: ${selectSort(arr)}`);


function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];
        let j;
        for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j];
        }
        arr[++j] = temp;
    }
    return arr;
}
console.log(`插入排序: ${insertSort(arr)}`);


function quickSort(arr) {
    function adjustLeft(arr, l, m, r) {
        [arr[m], arr[l], arr[r]] = [arr[l], arr[m], arr[r]].sort((a, b) => a - b);
    }
    function sort(arr, left, right) {
        if (left >= right) {
            return;
        }
        let i = left;
        let j = right;
        const m = (i + j) >> 1;
        j - i > 1 && adjustLeft(arr, i, m, j);
        const key = arr[i];
        while(i < j) {
            while(i < j && arr[j] >= key) {
                j--;
            }
            arr[i] = arr[j];
            while(i < j && arr[i] <= key) {
                i++;
            }
            arr[j] = arr[i];
        }
        arr[i] = key;
        sort(arr, left, i - 1);
        sort(arr, i + 1, right);
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
console.log(`快速排序: ${quickSort(arr)}`);

function mergeSort(arr) {
    function merge(arr, l, m, r) {
        let leftStartIdx = l;
        let rightStartIdx = m + 1;
        const tempArr = [];
        let idx = 0;
        while(leftStartIdx <= m && rightStartIdx <= r) {
            if (arr[leftStartIdx] <= arr[rightStartIdx]) {
                tempArr[idx++] = arr[leftStartIdx++];
            } else {
                tempArr[idx++] = arr[rightStartIdx++];
            }
        }
        while(leftStartIdx <= m) { tempArr[idx++] = arr[leftStartIdx++]; }
        while(rightStartIdx <= r) { tempArr[idx++] = arr[rightStartIdx++]; }
        for (let i = 0, j = l; i < idx  && j <= r; i++, j++) { arr[j] = tempArr[i]; }
    }
    function sort (arr, l, r) {
        if (l >= r) { return; }
        const m = (l + r) >> 1;
        sort(arr, l, m);
        sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
console.log(`归并排序: ${mergeSort(arr)}`);


function heapSort(arr) {
    function adjustMaxHeap(arr, i, len) {
        let left = i * 2 + 1;
        let right = i * 2 + 2;
        let max = i;
        if (left < len && arr[left] > arr[max]) {
            max = left;
        }
        if (right < len && arr[right] > arr[max]) {
            max = right;
        }
        if (max !== i) {
            [arr[i], arr[max]] = [arr[max], arr[i]];
            adjustMaxHeap(arr, max, len);
        }
    }

    function buildMaxHeap(arr) {
        for (let i = arr.length >> 1 - 1; i >= 0; i--) {
            adjustMaxHeap(arr, i, arr.length);
        }
    }

    function sort(arr) {
        buildMaxHeap(arr);
        for (let i = arr.length - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            adjustMaxHeap(arr, 0, i);
        }
    }
    sort(arr);
    return arr;
}
console.log(`堆排序: ${heapSort(arr)}`);
