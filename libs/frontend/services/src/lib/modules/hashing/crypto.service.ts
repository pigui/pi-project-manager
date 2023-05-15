import { Injectable } from '@angular/core';
import { HashingService } from './hashing.service';
import { AES } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements HashingService {
  private secretKey = 'secret';
  encrypt(message: string): string {
    return AES.encrypt(message, this.secretKey).toString();
  }

  decrypt(encryptMessage): string {
    return AES.decrypt(encryptMessage, this.secretKey).toString();
  }
}
