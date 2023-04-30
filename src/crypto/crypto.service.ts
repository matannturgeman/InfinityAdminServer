import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private iv: Buffer;

  constructor() {
    const { ENC_KEY, RANDOM_BYTES } = process.env;

    if (!ENC_KEY || ENC_KEY.length !== 32) {
      throw new Error('ENC_KEY must be set and must be 32 bytes long');
    }

    if (!RANDOM_BYTES) {
      throw new Error('ENC_KEY must be set and must be 32 bytes long');
    }
    this.iv = Buffer.from(process.env.RANDOM_BYTES, "hex")
  }

  async encrypt(text: string): Promise<string> {
    const key = (await promisify(scrypt)(
      process.env.ENC_KEY,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

    return encryptedText.toString('hex');
  }

  async decrypt(encryptedText: string): Promise<string> {
    const key = (await promisify(scrypt)(
      process.env.ENC_KEY,
      'salt',
      32,
    )) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);

    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]).toString();

    return decryptedText;
  }
}
