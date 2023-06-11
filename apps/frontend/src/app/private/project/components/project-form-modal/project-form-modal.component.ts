import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  ButtonFieldComponent,
  ColumnComponent,
  FormComponent,
  FormFieldComponent,
  FormLabelComponent,
  GridComponent,
  InputDirective,
  ModalComponent,
} from '@frontend/ui';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthService,
  CreateProjectInput,
  GeneralService,
  ProjectsService,
} from '@frontend/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { plainToClass, plainToInstance } from 'class-transformer';

const STYLES = 'c-project-form-modal';

@Component({
  selector: 'pi-project-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    GridComponent,
    ColumnComponent,
    FormFieldComponent,
    FormComponent,
    InputDirective,
    FormLabelComponent,
    ReactiveFormsModule,
    QuillModule,
    ButtonFieldComponent,
    ButtonDirective,
    TranslateModule,
  ],
  templateUrl: './project-form-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormModalComponent implements OnInit {
  @HostBinding('class') className = STYLES;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly projectService: ProjectsService = inject(ProjectsService);
  private readonly generalService: GeneralService = inject(GeneralService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    user: [this.authService.firstName(), [Validators.required]],
  });

  ngOnInit(): void {
    this.form.get('user').disable();
    this.projectService.isLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (isLoading: boolean) => {
          this.generalService.setFullLoading(isLoading);
        },
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, description } = this.form.getRawValue();
      const createProjectInput: CreateProjectInput = plainToInstance(
        CreateProjectInput,
        { name, description }
      );
      this.projectService.createProject(createProjectInput).subscribe();
    }
  }
}
