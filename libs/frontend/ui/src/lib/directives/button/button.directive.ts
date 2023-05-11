import {
  AfterViewInit,
  Directive,
  HostBinding,
  Input,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

const STYLES = `border border-solid w-full h-14 text-white disabled:bg-opacity-70`;

export type ButtonType = 'primary' | 'secondary';

@Directive({
  selector: '[piButton]',
  standalone: true,
})
export class ButtonDirective {
  @Input() set buttonType(val) {
    this.typeColor(val);
  }
  private style: Signal<string> = signal(STYLES);
  private color: WritableSignal<string> = signal('bg-primary-color');
  @HostBinding('class') get className() {
    return computed(() => `${this.style()} ${this.color()}`)();
  }

  private typeColor(color: ButtonType): void {
    switch (color) {
      case 'primary':
        this.color.set('bg-primary-color');
        break;
      case 'secondary':
        this.color.set('bg-secondary-color');
        this.color();
        break;
    }
  }
}
