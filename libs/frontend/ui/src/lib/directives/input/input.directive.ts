import {
  Directive,
  HostBinding,
  Optional,
  Self,
  Signal,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[piInput]',
  standalone: true,
})
export class InputDirective {
  private styles: Signal<string> = signal('c-input');
  @HostBinding('class')
  get className() {
    return this.styles();
  }

  constructor(@Optional() @Self() public ngControl?: NgControl) {}
}
