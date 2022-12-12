import { SetMetadata } from "@nestjs/common";
import { FunctionsEnum } from "../interfaces/function-enum";

export const Functions = (...functions: FunctionsEnum[]) => SetMetadata('functions', functions);