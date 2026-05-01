// 常见方法：

// JSON.parse(JSON.stringify(obj))
// 简单但有局限：不能处理函数、undefined、Symbol、循环引用、Date、RegExp 等。

// 递归实现（推荐用于可控结构）：
function deepClone(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return visited.get(obj); // 处理循环引用

    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    const clone = Array.isArray(obj) ? [] : {};
    visited.set(obj, clone);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], visited);
        }
    }
    return clone;
}
// 使用库：如 Lodash 的 _.cloneDeep(obj)。