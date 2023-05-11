import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthModule,
  AuthService,
  GeneralModule,
  GeneralService,
  SignUpInput,
} from '@frontend/services';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  ButtonFieldComponent,
  FormComponent,
  FormFieldComponent,
  FormLabelComponent,
  InputDirective,
} from '@frontend/ui';
import { take } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pi-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    AuthModule,
    ReactiveFormsModule,
    InputDirective,
    FormFieldComponent,
    FormLabelComponent,
    FormComponent,
    ReactiveFormsModule,
    ButtonDirective,
    ButtonFieldComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  destroyRef: DestroyRef = inject(DestroyRef);
  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.authService.isLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (isLoading: boolean) => {
          this.generalService.setFullLoading(isLoading);
        },
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, firstName, lastName, password } = this.form.getRawValue();
      const signUpInput: SignUpInput = plainToClass(SignUpInput, {
        email,
        firstName,
        lastName,
        password,
      });

      this.authService
        .signUp(signUpInput)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });
      return;
    }
  }
}
