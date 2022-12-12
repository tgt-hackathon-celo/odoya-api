import { Body, Controller, HttpCode, HttpException, HttpStatus, NotFoundException, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "../../../core/dtos/response.dto";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { EncryptInterceptor } from "../../../core/interceptors/encrypt.interceptor";
import { ValidatorInterceptor } from "../../../core/interceptors/validator.interceptor";
import { AuthenticateTokenDto } from "../dtos/authenticate-token.dto";
import { AuthenticateDto } from "../dtos/authenticate.dto";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserStatusEnum } from "../schemas/user-status.enum";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { AuthenticateTokenValidator } from "../validators/authenticate-token.validator";
import { AuthenticateValidator } from "../validators/authenticate.validator";

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {

    constructor(
        readonly configService: ConfigService,
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService,
    ) { }

    @Post('/authenticate')
    @HttpCode(200)
    @UseInterceptors(
        //new EncryptInterceptor(),
        //new ValidatorInterceptor(new AuthenticateValidator())
    )
    async authenticate(
        @Body() dto: AuthenticateDto
    ) {

        try {

            const user = await this.authenticationService.validate(dto.email, dto.password);

            console.log('user',user,dto.email, dto.password);
            if (!user)
                throw new NotFoundException('Email ou senha inválido(s)!');

            if (user.status === UserStatusEnum.inactive)
                throw new UnauthorizedException('Erro ao realizar a autenticação!');

            const token = await this.authenticationService.createToken(
                user._id,
                user.email,
            );

            return new ResponseDto(
                true,
                {
                    email: user.email,
                    token
                },
                null
            );

        } catch (error) {
            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/authenticate/token')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async authenticateToken(
        @Req() request
    ) {

        try {
            const payload: JwtPayload = request.user;
            const user = await this.userService.getById(payload.userId);

            if (!user)
                throw new NotFoundException('Email ou senha inválido(s)!');

            if (user.status === UserStatusEnum.inactive)
                throw new UnauthorizedException('Erro ao realizar a autenticação!');

            return new ResponseDto(
                true,
                {
                    isValid: true,
                    email: user.email,
                },
                null
            );

        } catch (error) {
            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }
}