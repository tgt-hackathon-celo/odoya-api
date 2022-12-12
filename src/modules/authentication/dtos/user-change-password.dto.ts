import { ApiProperty } from "@nestjs/swagger";

export abstract class UserChangePasswordDto{
    
    @ApiProperty({ type: String })
    email: string;
}