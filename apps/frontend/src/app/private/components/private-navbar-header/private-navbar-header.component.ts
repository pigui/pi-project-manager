import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@frontend/services';

const STYLES = ``;
@Component({
  selector: 'pi-private-navbar-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-navbar-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarHeaderComponent {
  @HostBinding('class') className = STYLES;
  @Input() user: User;
}
