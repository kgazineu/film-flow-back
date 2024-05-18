export class InvalidRequestBody extends Error {
    constructor() {
        super('Invalid request body.')
    }
}