import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserChangePasswordConfirmationDto } from "../dtos/user-change-password-confirmation.dto";

@Injectable()
export class UserChangePasswordConfirmationValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserChangePasswordConfirmationDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.email, 'email é obrigatório!');
        validator.isEmail(dto.email, 'email é inválido!');

        validator.isRequired(dto.newPassword, 'nova senha é obrigatório!');
        validator.hasMinLen(dto.newPassword, 6, 'nova senha deve ter no mínimo 6 caracteres!');
        validator.hasMaxLen(dto.newPassword, 20, 'nova senha deve ter no máximo 20 caracteres!');

        validator.isRequired(dto.code, 'codigo é obrigatório!');
       
        this.errors = validator.errors;
        return validator.isValid();
    }
}