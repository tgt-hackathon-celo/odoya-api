import { ApiProperty } from "@nestjs/swagger";

export abstract class UserUpdateStatusDto{
    
    @ApiProperty({ type: String })
    status: string;
}