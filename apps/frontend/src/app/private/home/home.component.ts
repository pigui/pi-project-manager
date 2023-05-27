import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService, Project } from '@frontend/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'pi-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);

  myProjects$: Observable<Project[]> = this.homeService.myProjects$;

  ngOnInit(): void {
    this.homeService.builMyProjects(this.destroyRef);
  }
}
