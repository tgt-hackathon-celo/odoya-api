import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "../../authentication/interfaces/user.interface";

export abstract class ContactInfoRegisterDto {

    @ApiProperty({ type: String })
    phone: string;

    @ApiProperty({ type: String })
    email: string;

    user: UserInterface;
}