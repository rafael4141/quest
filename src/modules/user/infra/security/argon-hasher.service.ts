import { Injectable } from '@nestjs/common';
import { HasherServiceAbstract } from '../../application/security/hasher.service';
import { verify, hash } from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class ArgonHasherService implements HasherServiceAbstract {
  async compare(plain: string, hash: string): Promise<boolean> {
    return verify(hash, plain);
  }

  hash(value: string): Promise<string> {
    const salt = crypto.randomBytes(16);
    return hash(value, { salt });
  }
}
