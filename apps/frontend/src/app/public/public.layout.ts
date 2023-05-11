import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicCardComponent } from './components/public-card/public-card.component';

@Component({
  selector: 'pi-public',
  standalone: true,
  imports: [CommonModule, RouterModule, PublicCardComponent],
  templateUrl: './public.layout.html',
  styleUrls: ['./public.layout.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
