import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserUpdateStatusDto } from "../dtos/user-update-status.dto";
import { UserStatusEnum } from "../schemas/user-status.enum";

@Injectable()
export class UserUpdateStatusValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserUpdateStatusDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.status, 'status é obrigatório!');
        validator.containIn(dto.status, UserStatusEnum, 'status inálido!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}