import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@frontend/services';

@Component({
  selector: 'pi-private-navbar-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-navbar-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbarHeaderComponent {
  @Input() user: User;
}
