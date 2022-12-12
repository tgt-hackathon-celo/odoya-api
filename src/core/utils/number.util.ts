export default class NumberUtil {
    static generateRandomNumber() {
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }

    static generateRandomNumberArbitrary(min, max): number {
        return Math.random() * (max - min) + min;
    }
}