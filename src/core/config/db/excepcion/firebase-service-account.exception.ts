export class InvalidFirebaseServiceAccountException extends Error {
    constructor() {
        super('Invalid Firebase Service Account');
    }
}