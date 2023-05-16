import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicCardComponent } from './components/public-card/public-card.component';
import { AuthService } from '@frontend/services';

@Component({
  selector: 'pi-public',
  standalone: true,
  imports: [CommonModule, RouterModule, PublicCardComponent],
  templateUrl: './public.layout.html',
  styleUrls: ['./public.layout.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.clearAuth();
  }

  private clearAuth(): void {
    this.authService.setAccessToken(null);
    this.authService.setCurrentUser(null);
  }
}
