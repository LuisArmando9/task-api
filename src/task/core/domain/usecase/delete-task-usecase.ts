export abstract class DeleteTaskUsecase {
    abstract delete(id: string): Promise<void>;
}