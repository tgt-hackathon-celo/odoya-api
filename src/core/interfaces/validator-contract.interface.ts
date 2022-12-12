export interface ValidatorContractInterface {
    errors: any[];
    validate(dto: any): boolean;
}