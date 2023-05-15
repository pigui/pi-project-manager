import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pi-private-navbar-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-navbar-menu-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarMenuItemComponent {}
