import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {

    @ApiProperty({ type: String})
    cep: string;

    @ApiProperty({ type: String})
    street: string;

    @ApiProperty({ type: String})
    number: string;

    @ApiProperty({ type: String})
    complement: string;

    @ApiProperty({ type: String})
    district: string;

    @ApiProperty({ type: String})
    city: string;

    @ApiProperty({ type: String})
    state: string;
}