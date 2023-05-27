import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateNavbarHeaderComponent } from '../private-navbar-header/private-navbar-header.component';
import { PrivateNavbarMenuComponent } from '../private-navbar-menu/private-navbar-menu.component';
import { User } from '@frontend/services';

const STYLES = `c-navbar`;

@Component({
  selector: 'pi-private-navbar',
  standalone: true,
  imports: [
    CommonModule,
    PrivateNavbarHeaderComponent,
    PrivateNavbarMenuComponent,
  ],
  templateUrl: './private-navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarComponent {
  @HostBinding('class') className = STYLES;
  @Input() user: User;
}
