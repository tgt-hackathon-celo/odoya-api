import { ApiProperty } from "@nestjs/swagger";

export abstract class PersonalInfoUpdateDto {

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    phone: string;

    @ApiProperty({ type: String })
    password: string;

    @ApiProperty({ type: String })
    cep: string;

    @ApiProperty({ type: String })
    address: string;

    @ApiProperty({ type: String })
    number: string;

    @ApiProperty({ type: String })
    street: string;

    @ApiProperty({ type: String })
    city: string;

    @ApiProperty({ type: String })
    state: string;
    
    emailNotification: boolean;

}