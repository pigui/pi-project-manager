import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { FullLoadingComponent } from '@frontend/ui';
import { GeneralService } from '@frontend/services';
import { CommonModule } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    NxWelcomeComponent,
    RouterModule,
    FullLoadingComponent,
    HttpClientModule,
    ApolloModule,
  ],
  providers: [HttpLink],
  selector: 'pi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public readonly generalService: GeneralService = inject(GeneralService);
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

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
