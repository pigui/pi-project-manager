import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  HostBinding,
  Input,
  Signal,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { FormLabelComponent } from '../form-label/form-label.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { FormErrorComponent } from '../form-error/form-error.component';

const STYLES = `w-full`;

@Component({
  selector: 'pi-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements AfterViewInit {
  @Input() key: string;
  @HostBinding('class') get className() {
    return this.styles();
  }
  @ContentChild(FormLabelComponent) label: FormLabelComponent;
  @ContentChild(FormErrorComponent) error: FormErrorComponent;

  private readonly styles: Signal<string> = signal(STYLES);
  private readonly formGroupDirective?: FormGroupDirective =
    inject(FormGroupDirective);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  get formGroup(): FormGroup {
    return this.formGroupDirective?.form;
  }

  get formControl(): FormControl {
    return this.formGroup?.get(this.key) as FormControl;
  }

  ngAfterViewInit(): void {
    if (this.formControl && this.key) {
      this.buildChangeStatus();
    }
  }

  private buildChangeStatus(): void {
    this.formControl.statusChanges
      .pipe(
        startWith(this.formControl.status),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((formStatus: FormControlStatus) => {
        if (formStatus === 'INVALID' && this.formControl.dirty) {
          this.label.setInvalid(true);
          return;
        }
        this.label.setInvalid(false);
      });
  }
}
