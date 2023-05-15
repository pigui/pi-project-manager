import { NgModule } from '@angular/core';
import { HashingService } from './hashing.service';
import { CryptoService } from './crypto.service';

@NgModule({
  providers: [{ provide: HashingService, useClass: CryptoService }],
})
export class HashingModule {}
