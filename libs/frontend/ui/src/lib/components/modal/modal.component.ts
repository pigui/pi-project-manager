import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = 'c-modal';

@Component({
  selector: 'pi-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @HostBinding('class') className = STYLES;
}
