import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class HashingService {
  abstract encrypt(message: string): string;
  abstract decrypt(encryptMessage: string): string;
}
