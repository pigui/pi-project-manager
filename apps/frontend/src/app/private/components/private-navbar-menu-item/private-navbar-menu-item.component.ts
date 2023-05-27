import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMenuItem } from '../../interfaces';
import { RouterModule } from '@angular/router';

const STYLES = 'c-navbar-menu-items';

@Component({
  selector: 'pi-private-navbar-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './private-navbar-menu-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarMenuItemComponent {
  @HostBinding('class') className = STYLES;
  @Input() item: NavbarMenuItem;
  @Input() isChildren: boolean = false;
}
