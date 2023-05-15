import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ApolloModule } from 'apollo-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, ApolloModule],
  providers: [AuthService],
})
export class AuthModule {}
