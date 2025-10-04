export abstract class HasherServiceAbstract {
  abstract hash(value: string): Promise<string>;
  abstract compare(plain: string, hash: string): Promise<boolean>;
}
