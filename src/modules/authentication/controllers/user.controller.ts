import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Put, Req, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "../../../core/dtos/response.dto";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { UserService } from "../services/user.service";
import { UserStatusEnum } from "../schemas/user-status.enum";
import { UserInterface } from "../interfaces/user.interface";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserPersonalService } from "../services/user-professional.service";
import { UserRegisterDto } from "../dtos/user-register.dto";
import { UserProfessionalInfoRegisterDto } from "../dtos/user-professional-info-register.dto";
import { Contract, ethers, utils, providers } from 'ethers'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { CeloProvider } from '@celo-tools/celo-ethers-wrapper'
import { ActionRegisterDto } from "../dtos/action-register.dto";

@ApiTags('user')
@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
        private readonly userProfessionalService: UserPersonalService,
        // private readonly verificationService: VerificationService,
        // private readonly contactInfoService: ContactInfoService,
    ) { }

    @Get('list')
    @HttpCode(200)
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    async list() {
        try {
            const result = await this.userService.list();
            return new ResponseDto(true, result, null);
        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('ProfessionalList')
    @HttpCode(200)
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    async listProfessional() {
        try {
            const result = await this.userProfessionalService.list();
            return new ResponseDto(true, result, null);
        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('id/:id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getById(@Param('id') id: string) {

        try {

            const result = await this.getUserById(id);
            return new ResponseDto(true, result, null);

        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('authenticated')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getAuthenticated(
        @Req() request
    ) {

        try {
            const payload: JwtPayload = request.user;
            const result = await this.getUserByEmail(payload.email);
            return new ResponseDto(true, result, null);

        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('connection/MetaMask')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getConnectionMetaMask(
        @Req() request
    ) {
        const { ethers } = require("ethers");
        try {
            const payload: JwtPayload = request.user;
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider()

            // MetaMask requires requesting permission to connect users accounts
            const result = await provider.send("eth_requestAccounts", []);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner()
            //const result = await this.getUserByEmail(payload.email);
            return new ResponseDto(true, result, null);

        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('contractInteraction')
    @HttpCode(200)
    //@UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getContractInteraction(
        @Req() request
    ) {
        const { ethers } = require("ethers");
        try {
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            const wallet = new CeloWallet('0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1', provider)
            //const txResponse = await wallet.sendTransaction({
            //    to: recipient,
            //    value: amountInWei,
            //  })
            //const txReceipt = await txResponse.wait()
            //console.info(`CELO transaction hash received: ${txReceipt.transactionHash}`)
            const abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"uint256","name":"when","type":"uint256"},{"indexed":false,"internalType":"string","name":"where","type":"string"}],"name":"NewRegenAction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newLeader","type":"address"}],"name":"addLeader","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_leader","type":"address"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_place","type":"string"},{"internalType":"uint256","name":"_when","type":"uint256"},{"internalType":"uint256","name":"_totalRewards","type":"uint256"}],"name":"addRegenAction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowedLeaders","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_regenActionID","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"regenActionCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"regenActionPlanned","outputs":[{"internalType":"address","name":"leader","type":"address"},{"internalType":"address","name":"nft","type":"address"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"place","type":"string"},{"internalType":"uint256","name":"when","type":"uint256"},{"internalType":"uint256","name":"totalRewards","type":"uint256"},{"internalType":"uint256","name":"totalRewardsAvailable","type":"uint256"},{"internalType":"bool","name":"stillValid","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_oldLeader","type":"address"}],"name":"removeLeader","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
            const address = '0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1'
            const stableToken = new ethers.Contract(address, abi, wallet)
            const action = await stableToken.regenActionPlanned(1)

            console.log('action', action);
            //await odoyaToken.addRegenAction(owner.getAddress(), "Teste de Limpeza Praia Boqueirão", "-23.5489,-46.6388", nextWeek, ethers.BigNumber.from("10000"));
            //await odoyaToken.mint("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591", ethers.BigNumber.from("1000"), 1);


            //const wallet = '0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1'

            //console.info(`Sending ${amountInWei} cUSD`)
            //const txResponse: providers.TransactionResponse = await stableToken.transferWithComment(recipient, amountInWei, comment)
            //const txReceipt = await txResponse.wait()
            //console.info(`cUSD payment hash received: ${txReceipt.transactionHash}`)
            //return new ResponseDto(true, txReceipt, null);

        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    @Post('registerUser')
    @HttpCode(201)
    async register(
        @Body() dto: UserRegisterDto
    ) {
        try {

            dto.status = UserStatusEnum.active;

            const user = await this.userService.save(dto);

            return new ResponseDto(
                true,
                {
                    _id: user._id,
                    email: user.email
                },
                null
            );

        } catch (error) {

            this.logger.error(error.message);

            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('registerProfessional')
    @HttpCode(201)
    async registerProfessional(
        @Body() dto: UserProfessionalInfoRegisterDto
    ) {
        try {

            const user = await this.userProfessionalService.save(dto);

            return new ResponseDto(
                true,
                {
                    _id: user._id,
                },
                null
            );

        } catch (error) {

            this.logger.error(error.message);

            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('CadastroAcao')
    @HttpCode(201)
    async registerCadastroAcao(
        @Body() dto: ActionRegisterDto
    ) {
        try {
            const config = require("../../../../hardhat.config.js");
            const abi = require("../../../../abi.json")
            const accounts = config.networks.alfajores.accounts;
            const provider = ethers.getDefaultProvider(config.networks.alfajores.url)
            const index = 0; // first wallet, increment for next wallets
            const wallet = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + `/${index}`);
            const privateKey = wallet.privateKey;
            const walletAddress = wallet.address;
            const walletSigner = wallet.connect(provider);
            const balance = (await walletSigner.getBalance()).toString();
            console.log("Account pvt key:", privateKey);
            console.log("Account address:", walletAddress);
            console.log("Account balance:", balance);

           //if (balance < 100000000000) {
           //    console.log("pop up the account");
           //    return;
           //}
            console.log("conectando ao contrato")
            const odoyaSC = new ethers.Contract("0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1", abi, walletSigner);
            console.log("conectado ao contrato")
            console.log("enviando addRegenAction")
            let dataFutura = new Date()
            //dataFutura = dataFutura.setSeconds(dataFutura.getSeconds() + 300);
            console.log("data futura", dataFutura)
            const txReceipt = await odoyaSC.addRegenAction(walletAddress, dto.name, dto.geolocation, dto.data, ethers.BigNumber.from("10"));
            console.log("addRegenAction enviado")
            const txReceiptWait = await txReceipt.wait()
            console.log("addRegenAction processado")
            console.log("recibo", txReceiptWait)
            if (txReceiptWait.status === 1) {
                console.info(`Tx OK: ${txReceiptWait.transactionHash}`)
            } else {
                console.error("Deu ruim")
                return
            }
            const novoActionID = await odoyaSC.regenActionCounter();
            let action = await odoyaSC.regenActionPlanned(novoActionID);
            console.log("action:", action);

            return new ResponseDto(
                true,
                {
                    txReceipt,
                },
                null
            );

        } catch (error) {

            this.logger.error(error.message);

            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('registerClients')
    @HttpCode(201)
    async registerClients(
        @Body() dto: UserRegisterDto
    ) {
        try {

            dto.status = UserStatusEnum.active;

            const user = await this.userService.save(dto);

            return new ResponseDto(
                true,
                {
                    _id: user._id,
                    email: user.email
                },
                null
            );

        } catch (error) {

            this.logger.error(error.message);

            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('id/:id')
    @HttpCode(200)
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    async deletar(
        @Param('id') _id: string,
    ) {

        try {

            const result = await this.userService.delete(_id);

            return new ResponseDto(
                true,
                {
                    _id: result._id,
                    email: result.email,
                },
                null,
            );

        } catch (error) {
            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    private async getUserById(_id: string): Promise<UserInterface> {
        const usuario = await this.userService.getById(_id);

        if (!usuario)
            throw new NotFoundException('Erro ao obter o usuario!');

        return usuario;
    }

    private async getUserByEmail(email: string): Promise<UserInterface> {
        const usuario = await this.userService.getByEmail(email);

        if (!usuario)
            throw new NotFoundException('Erro ao obter o usuario!');

        return usuario;
    }
}