export class CodeAlreadyExistsError extends Error {
    constructor() {
        super('Code already exists.')
    }
}