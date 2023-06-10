import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { AuthService } from '@frontend/services';

const STYLES = 'ly-private';

@Component({
  selector: 'pi-private',
  standalone: true,
  imports: [CommonModule, RouterModule, PrivateNavbarComponent],
  templateUrl: './private.layout.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayout {
  @HostBinding('class') className = STYLES;
  readonly authService: AuthService = inject(AuthService);
}
