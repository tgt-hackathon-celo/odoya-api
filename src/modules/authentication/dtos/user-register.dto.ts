import { ApiProperty } from "@nestjs/swagger";
import { UserProfessionalProductRegisterDto } from "./user-professional-products-register.dto";

export abstract class UserRegisterDto {

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    password: string;
    
    status: string;

}