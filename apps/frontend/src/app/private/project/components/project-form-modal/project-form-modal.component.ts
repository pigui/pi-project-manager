import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '@frontend/ui';

const STYLES = '-project-form-modal';

@Component({
  selector: 'pi-project-form-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './project-form-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormModalComponent {
  @HostBinding('class') className = STYLES;
  private readonly fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    name: [],
    description: [],
  });
}
