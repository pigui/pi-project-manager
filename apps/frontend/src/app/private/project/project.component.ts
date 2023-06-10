import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ProjectFormModalComponent } from './components/project-form-modal/project-form-modal.component';
import { ButtonDirective } from '@frontend/ui';
import { ProjectsService } from '@frontend/services';

@Component({
  selector: 'pi-project',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonDirective],
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  public readonly dialog: Dialog = inject(Dialog);
  public dialogRef: DialogRef;
  private readonly projectsService: ProjectsService = inject(ProjectsService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    this.projectsService.loadData(this.destroyRef);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ProjectFormModalComponent, {
      disableClose: false,
    });
  }
}
