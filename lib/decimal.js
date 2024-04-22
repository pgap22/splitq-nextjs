import BigNumber from "bignumber.js";

export function sumDecimal() {
    const numbers = [...arguments].map(x => new BigNumber(x ? x : 0)).reduce((a, b) => new BigNumber(a).plus(new BigNumber(b)), 0)
    return numbers.dp(2).toNumber();
}
export function minusDecimal() {
    const numbers = [...arguments].map(x => new BigNumber(x ? x : 0)).reduce((a, b) => new BigNumber(a).minus(new BigNumber(b)), 0)
    return numbers.dp(2).toNumber();
}
export function multiplyDecimal() {
    const numbers = [...arguments].map(x => new BigNumber(x ? x : 0)).reduce((a, b) => new BigNumber(a).times(new BigNumber(b)), 1)
    return numbers.dp(2).toNumber();
}