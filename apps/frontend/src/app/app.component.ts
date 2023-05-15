import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { FullLoadingComponent } from '@frontend/ui';
import {
  AuthModule,
  GeneralModule,
  GeneralService,
  HashingModule,
} from '@frontend/services';

import { CommonModule } from '@angular/common';
import { Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/cache';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    HashingModule,
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
export class AppComponent implements OnInit {
  title = 'frontend';
  generalService: GeneralService = inject(GeneralService);
  private readonly apollo: Apollo = inject(Apollo);
  private readonly httpLink: HttpLink = inject(HttpLink);
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
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

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.generalService.setCurrentPage(event.url);
        }
      });
  }
}
