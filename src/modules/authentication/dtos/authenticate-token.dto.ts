import { ApiProperty } from "@nestjs/swagger";

export abstract class AuthenticateTokenDto {
    
    @ApiProperty({ type: String })
    token: string;
}