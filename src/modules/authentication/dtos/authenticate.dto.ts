import { ApiProperty } from "@nestjs/swagger";

export abstract class AuthenticateDto {
    
    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    password: string;
}