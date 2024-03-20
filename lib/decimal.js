import BigNumber from "bignumber.js";

export function sumDecimal() {
    const numbers = [...arguments].map(x => new BigNumber(x)).reduce((a, b) => new BigNumber(a).plus(new BigNumber(b)), 0)
    return numbers.toNumber();
}