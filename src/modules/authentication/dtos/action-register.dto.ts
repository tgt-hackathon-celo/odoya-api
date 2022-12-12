import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "../interfaces/user.interface";
import { UserProfessionalProductRegisterDto } from "./user-professional-products-register.dto";

export abstract class ActionRegisterDto{
  
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    geolocation: string;

    @ApiProperty({ type: Date })
    data: Date;
    
   //user: UserInterface;
}