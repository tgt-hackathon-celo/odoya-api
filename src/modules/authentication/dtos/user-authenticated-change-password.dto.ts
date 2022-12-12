import { ApiProperty } from "@nestjs/swagger";

export abstract class UserAuthenticatedChangePasswordDto{
  
    @ApiProperty({ type: String })
    previousPassword: string;

    @ApiProperty({ type: String })
    newPassword: string;
}