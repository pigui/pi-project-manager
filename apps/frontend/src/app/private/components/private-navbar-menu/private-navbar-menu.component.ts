import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateNavbarMenuItemComponent } from '../private-navbar-menu-item/private-navbar-menu-item.component';
import { NavbarMenuItem } from '../../interfaces';

const STYLES = `c-navbar-menu`;

@Component({
  selector: 'pi-private-navbar-menu',
  standalone: true,
  imports: [CommonModule, PrivateNavbarMenuItemComponent],
  templateUrl: './private-navbar-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarMenuComponent {
  @HostBinding('class') className = STYLES;
  menu: NavbarMenuItem[] = [
    {
      id: 'home',
      name: 'private.menu.home',
      navigation: ['home'],
    },
    {
      id: 'projects',
      name: 'private.menu.projects',
      navigation: ['projects'],
    },
  ];
}
