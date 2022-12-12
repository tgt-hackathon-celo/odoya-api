import { ApiProperty } from "@nestjs/swagger";

export abstract class UserUpdateDto{
    
    @ApiProperty({ type: String })
    name: string;
}