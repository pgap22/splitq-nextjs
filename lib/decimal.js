import BigNumber from "bignumber.js";

export function sumDecimal() {
    const numbers = [...arguments].map(x => new BigNumber(x ? x : 0)).reduce((a, b) => new BigNumber(a).plus(new BigNumber(b)), 0)
    return numbers.toNumber();
}