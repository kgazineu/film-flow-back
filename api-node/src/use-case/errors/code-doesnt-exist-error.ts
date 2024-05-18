export class CodeDoesntExistError extends Error {
    constructor() {
        super('Code doesnt exist.')
    }
}