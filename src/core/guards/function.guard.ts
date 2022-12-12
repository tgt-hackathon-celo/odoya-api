import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FunctionsEnum } from "../interfaces/function-enum";

@Injectable()
export class FunctionGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredFunctions = this.reflector.getAllAndOverride<FunctionsEnum[]>('functions', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredFunctions)
            return true;

        const { user } = context.switchToHttp().getRequest();

        return user.functions.some(a => requiredFunctions.includes(a));
    }
}