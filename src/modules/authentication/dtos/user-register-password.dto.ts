import { ApiProperty } from "@nestjs/swagger";

export abstract class UserActivateDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    code: number;
}