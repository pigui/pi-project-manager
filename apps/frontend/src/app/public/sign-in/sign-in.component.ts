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
import { AuthService, GeneralService, SignInInput } from '@frontend/services';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { plainToClass } from 'class-transformer';
import { take } from 'rxjs';

@Component({
  selector: 'pi-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDirective,
    FormFieldComponent,
    FormLabelComponent,
    FormComponent,
    ReactiveFormsModule,
    ButtonDirective,
    ButtonFieldComponent,
  ],
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly router: Router
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
      const { email, password } = this.form.getRawValue();
      const signInInput: SignInInput = plainToClass(SignInInput, {
        email,
        password,
      });
      this.authService
        .signIn(signInInput)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate(['home']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  goSignUp(): void {
    this.router.navigate(['sign-up']);
  }
}
