import {
  AfterContentInit,
  DestroyRef,
  Directive,
  HostBinding,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControlStatus,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { startWith } from 'rxjs';

@Directive({
  selector: '[piInput]',
  standalone: true,
})
export class InputDirective implements AfterContentInit {
  private readonly ngControl? = inject(NgControl);
  private readonly formGroupDirective?: FormGroupDirective =
    inject(FormGroupDirective);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly styles: Signal<string> = signal('c-input');
  private readonly invalidStatus: WritableSignal<boolean> = signal(false);
  @HostBinding('class')
  get className() {
    return this.styles();
  }

  @HostBinding('class.invalid')
  get classNameInvalid() {
    return this.invalidStatus();
  }
  ngAfterContentInit(): void {
    if (this.ngControl && this.formGroupDirective) {
      this.buildChangeStatus();
    }
  }

  private buildChangeStatus(): void {
    this.ngControl.statusChanges
      .pipe(
        startWith(this.ngControl.status),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((formStatus: FormControlStatus) => {
        if (formStatus === 'INVALID' && this.ngControl.dirty) {
          this.invalidStatus.set(true);
          return;
        }
        this.invalidStatus.set(false);
      });
  }
}
