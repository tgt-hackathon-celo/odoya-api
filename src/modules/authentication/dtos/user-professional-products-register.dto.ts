import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "../interfaces/user.interface";

export abstract class UserProfessionalProductRegisterDto{
    
    @ApiProperty({ type: String})
    name: string;

    @ApiProperty({ type: String})
    manufacturer: string;
    
}