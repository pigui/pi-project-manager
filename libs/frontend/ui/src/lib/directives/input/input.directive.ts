import {
  Directive,
  HostBinding,
  Optional,
  Self,
  Signal,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';

const STYLES = `mt-1 p-4 block w-full h-14 px-3 py-2 bg-white border border-primary-color text-sm text-primary-color shadow-sm placeholder-secondary-color
focus:outline-none focus:border-secondary-color focus:ring-2 focus:ring-secondary-color focus:text-secondary-color
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-error-color invalid:text-error-color
focus:invalid:border-error-color focus:invalid:ring-error-color`;

@Directive({
  selector: '[piInput]',
  standalone: true,
})
export class InputDirective {
  private styles: Signal<string> = signal(STYLES);
  @HostBinding('class')
  get className() {
    return this.styles();
  }

  constructor(@Optional() @Self() public ngControl?: NgControl) {
    
  }
}
