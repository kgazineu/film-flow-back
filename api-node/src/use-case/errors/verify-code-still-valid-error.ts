export class VerifyCodeStillValid extends Error {
    constructor() {
        super('Verification code still valid.')
    }
}
