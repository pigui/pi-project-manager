import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { DialogRef } from '@angular/cdk/dialog';
const STYLES = 'c-modal';

@Component({
  selector: 'pi-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ModalComponent implements OnInit {
  @HostBinding('class') className = STYLES;
  private readonly dialogRef: DialogRef<string> = inject(DialogRef);

  ngOnInit(): void {
    this.dialogRef.addPanelClass('c-modal__container');
  }
}
