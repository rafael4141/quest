export interface IUseCase<I, O> {
  execute(input: I): O | Promise<O>;
}
