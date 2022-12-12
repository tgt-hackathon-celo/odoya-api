import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticationController } from "../src/modules/authentication/controllers/authentication.controller";
import { RoleSchema } from "../src/modules/authentication/schemas/role.schema";
import { UserSchema } from "../src/modules/authentication/schemas/user.schema";
import { AuthenticationService } from "../src/modules/authentication/services/authentication.service";
import { RoleService } from "../src/modules/authentication/services/role.service";
import { JwtStrategy } from "../src/modules/authentication/strategies/jwt-strategy";
import { closeInMongodConnection, rootMongooseTestModule } from "./mock/database.test.util";
import * as request from 'supertest';
import CryptoUtil from "../src/core/utils/crypto.util";
import { UserStatusEnum } from "../src/modules/authentication/schemas/user-status.enum";
import { FunctionsEnum } from "../src/core/interfaces/function-enum";
import { UserTypeEnum } from "../src/modules/authentication/schemas/user-type.enum";

describe('AuthenticationController (e2e)', () => {

    let app: INestApplication;

    const apiUrl = '/authentication';

    const authenticationServiceMock = {
        validate: jest.fn(),
        createToken: jest.fn(),
    };

    const roleServiceMock = {
        getById: jest.fn(),
    };

    beforeEach(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                ConfigModule.forRoot(),
                MongooseModule.forFeature([
                    { name: 'user', schema: UserSchema },
                    { name: 'role', schema: RoleSchema },
                ]),
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    secret: process.env.JWT_KEY,
                    signOptions: {
                        expiresIn: Number(process.env.JWT_EXPIRATION),
                    },
                }),
            ],
            controllers: [
                AuthenticationController
            ],
            providers: [
                JwtStrategy,
                { provide: RoleService, useValue: roleServiceMock },
                { provide: AuthenticationService, useValue: authenticationServiceMock },
            ]
        }).compile();

        jest.resetAllMocks()
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        closeInMongodConnection();
        await app.close();
    });

    describe(`${apiUrl}/authenticate`, () => {

        it(`should thown if body is not encrypted`, () => {

            const body = { email: '', password: '123456' };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('payload é obrigatório!');
                });
        });

        it(`should thown if email is empty`, () => {

            const body = { email: '', password: '123456' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(2)
                    expect(response.body.errors[0]).toBe('email é obrigatório!')
                    expect(response.body.errors[1]).toBe('email é inválido!')
                });
        });

        it(`should thown if email is invalid`, () => {

            const body = { email: 'user', password: '123456' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('email é inválido!')
                });
        });

        it(`should thown if password is empty`, () => {

            const body = { email: 'admin@clubebelezinha.com', password: '' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(3)
                    expect(response.body.errors[0]).toBe('password é obrigatório!')
                    expect(response.body.errors[1]).toBe('password deve ter no mínimo 6 caracteres!')
                    expect(response.body.errors[2]).toBe('password deve ter no máximo 20 caracteres!')
                });
        });

        it(`should thown if password length is less than 6`, () => {

            const body = { email: 'admin@clubebelezinha.com', password: '11' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('password deve ter no mínimo 6 caracteres!')
                });
        });

        it(`should thown if password length is greater than 20`, () => {

            const body = { email: 'admin@clubebelezinha.com', password: '111111111111111111111' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('password deve ter no máximo 20 caracteres!')
                });
        });

        it(`should thown if user doesnt exist`, () => {

            authenticationServiceMock.validate.mockReturnValue(null);

            const body = { email: 'admin@clubebelezinha.com', password: '123456789' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('Email ou senha inválido(s)!')
                });
        });

        it(`should thown if user is inactive`, () => {

            authenticationServiceMock.validate.mockReturnValue({ status: UserStatusEnum.inactive });

            const body = { email: 'admin@clubebelezinha.com', password: '123456789' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.body.errors[0]).toBe('Erro ao realizar a autenticação!')
                });
        });

        it(`successful login`, () => {

            authenticationServiceMock.validate.mockReturnValue(
                {
                    roles:
                        [
                            { _id: '1' }
                        ],
                    status: UserStatusEnum.active
                });

            roleServiceMock.getById.mockReturnValue(
                {
                    functions: [
                        FunctionsEnum.user
                    ]
                });

            authenticationServiceMock.createToken.mockReturnValue(
                {
                    expiresIn: process.env.JWT_EXPIRATION,
                    accessToken:'test'
                });

            const body = { _id: '1', email: 'admin@clubebelezinha.com', password: 'P@ssw0rd', type: UserTypeEnum.consultor, branchId: '1' };

            const encryptedBody = { payload: CryptoUtil.encrypt(process.env.PAYLOAD_KEY, JSON.stringify(body)) };

            return request(app.getHttpServer())
                .post(`${apiUrl}/authenticate`)
                .send(encryptedBody)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.success).toBeTruthy()
                    expect(response.body.data.token).toEqual({
                        expiresIn: process.env.JWT_EXPIRATION,
                        accessToken:'test'
                    })
                });
        });
    });
});