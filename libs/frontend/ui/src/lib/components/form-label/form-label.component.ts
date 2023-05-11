import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = `text-sm text-primary-color`;

@Component({
  selector: 'pi-form-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLabelComponent {
  private styles: Signal<string> = signal(STYLES);
  @HostBinding('class') get className() {
    return this.styles();
  }
}
