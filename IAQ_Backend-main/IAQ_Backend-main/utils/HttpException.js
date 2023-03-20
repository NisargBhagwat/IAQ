class HttpException extends Error {
    constructor(message, status, hasError){
        super(message);
        this.message = message;
        this.status = status;
        this.hasError = hasError || true;
    }
}
module.exports = HttpException;