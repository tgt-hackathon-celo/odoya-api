export class ValidatorsUtil {

    constructor(
        public errors: any[] = []
    ) { }

    isRequired(value, message) {
        if (!value || value.length <= 0)
            this.errors.push(message);
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min)
            this.errors.push(message);
    }

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max)
            this.errors.push(message);
    }

    isFixedLen = (value, len, message) => {
        if (value.length !== len)
            this.errors.push(message);
    }

    isEmail = (value, message) => {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
            this.errors.push(message);
    }

    containIn = (value, enumReference, message) => {
        if (!Object.values(enumReference).includes(value))
            this.errors.push(message);
    }

    isFourDigitNumber = (value: number, message: string) => {
        let reg = new RegExp('^[+ 0-9]{4}$');
        if (!reg.test(value.toString()))
            this.errors.push(message);
    }

    isSixDigitNumber = (value: number, message: string) => {
        let reg = new RegExp('^[+ 0-9]{6}$');
        if (!reg.test(value.toString()))
            this.errors.push(message);
    }

    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
}
