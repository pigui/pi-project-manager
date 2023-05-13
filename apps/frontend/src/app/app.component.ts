import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { FullLoadingComponent } from '@frontend/ui';
import { AuthModule, GeneralModule, GeneralService } from '@frontend/services';

import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/cache';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';

@Component({
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    NxWelcomeComponent,
    RouterModule,
    FullLoadingComponent,
    GeneralModule,
    HttpClientModule,
    ApolloModule,
    AuthModule,
  ],
  providers: [HttpLink],
  selector: 'pi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  constructor(
    public readonly generalService: GeneralService,
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink
  ) {
    const http = this.httpLink.create({
      uri: 'http://localhost:3000/graphql',
    });
    const ws = new WebSocketLink({
      uri: 'ws://localhost:3000/graphql',
      options: {
        reconnect: true,
      },
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http
    );
    this.apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
