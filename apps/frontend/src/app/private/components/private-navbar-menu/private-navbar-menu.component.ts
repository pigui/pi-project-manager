import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateNavbarMenuItemComponent } from '../private-navbar-menu-item/private-navbar-menu-item.component';

@Component({
  selector: 'pi-private-navbar-menu',
  standalone: true,
  imports: [CommonModule, PrivateNavbarMenuItemComponent],
  templateUrl: './private-navbar-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarMenuComponent {}
