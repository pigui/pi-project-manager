import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ProjectFormModalComponent } from './components/project-form-modal/project-form-modal.component';
import { ButtonDirective, FormFieldComponent } from '@frontend/ui';

@Component({
  selector: 'pi-project',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonDirective, FormFieldComponent],
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  public readonly dialog: Dialog = inject(Dialog);
  public dialogRef: DialogRef;

  openDialog(): void {
    this.dialogRef = this.dialog.open(ProjectFormModalComponent, {
      disableClose: false,
    });
  }
}
