import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const STYLES = `c-form-error`;

@Component({
  selector: 'pi-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  private readonly styles: Signal<string> = signal(STYLES);
  protected readonly localErrorsSource: BehaviorSubject<string[]> =
    new BehaviorSubject([]);
  protected readonly serverErrorsSource: BehaviorSubject<string[]> =
    new BehaviorSubject([]);

  protected readonly allErrors$: Observable<string[]> = combineLatest([
    this.localErrors$,
    this.serverErrors$,
  ]).pipe(
    map(([local, server]) => {
      return [...local, ...server];
    })
  );

  get localErrors$(): Observable<string[]> {
    return this.localErrorsSource.asObservable();
  }

  get localErrors(): Signal<string[]> {
    return toSignal(this.localErrors$);
  }

  get serverErrors$(): Observable<string[]> {
    return this.serverErrorsSource.asObservable();
  }

  get serverErrors(): Signal<string[]> {
    return toSignal(this.serverErrors$);
  }

  get allErrors(): Signal<string[]> {
    return toSignal(this.allErrors$);
  }

  @HostBinding('class') get className() {
    return this.styles();
  }
}
