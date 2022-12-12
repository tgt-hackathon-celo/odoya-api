export class ResponseDto {
    constructor(
        public success: boolean,
        public data: any,
        public errors: any,
    ) { }
}