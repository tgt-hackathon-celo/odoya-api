import { ApiProperty } from "@nestjs/swagger";

export class UserChangePasswordResendEmailFirstAccessDto{
    
    @ApiProperty()
    email: string;
}