export function objDiff(obj1, obj2) {
    if (obj1 === obj2) return true; // If both are strictly equal, return true.

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false; // If one is primitive and different, return false.
    }

    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return false; // If one is an array and the other is not, they are different.
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Different number of keys.

    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || !objDiff(obj1[key], obj2[key])) {
            return false; // Recursively check nested objects.
        }
    }

    return true;
}
