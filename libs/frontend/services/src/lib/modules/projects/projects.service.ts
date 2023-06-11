import { DestroyRef, Injectable, Signal, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateProjectInput } from '../../inputs';
import {
  BehaviorSubject,
  Observable,
  catchError,
  take,
  tap,
  throwError,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CREATE_PROJECT, MY_PROJECTS } from './graphql';
import { GraphqlTypes } from '@common/graphql';
import { Project } from '../../models';

interface CreateProject {
  createProject: GraphqlTypes.Project;
}

interface MyProjects {
  projects: GraphqlTypes.Project[];
}

class State {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  project$: BehaviorSubject<Project[]> = new BehaviorSubject([]);
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apollo: Apollo = inject(Apollo);
  private readonly state = new State();

  private get isLoadingSource(): BehaviorSubject<boolean> {
    return this.state.isLoading$;
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSource.asObservable();
  }

  get isLoading(): Signal<boolean> {
    return toSignal(this.isLoading$);
  }

  private get projectsSource(): BehaviorSubject<Project[]> {
    return this.state.project$;
  }

  get projects$(): Observable<Project[]> {
    return this.projectsSource.asObservable();
  }

  get projects(): Signal<Project[]> {
    return toSignal(this.projects$);
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoadingSource.next(isLoading);
  }

  setProject(project: Project): void {
    return this.projectsSource.next([...this.projects(), project]);
  }

  loadData(destroyRef: DestroyRef): void {
    this.setIsLoading(true);
    this.apollo
      .watchQuery<MyProjects>({
        query: MY_PROJECTS,
      })
      .valueChanges.pipe(
        takeUntilDestroyed(destroyRef),
        tap(() => this.setIsLoading(false)),
        catchError((error) => {
          this.setIsLoading(false);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        response.data.projects
          ? response.data.projects.forEach((project) => {
              this.setProject(new Project(project));
            })
          : [];
      });
  }

  createProject(createProjectInput: CreateProjectInput) {
    this.setIsLoading(true);
    return this.apollo
      .mutate<CreateProject, { createProjectInput: CreateProjectInput }>({
        mutation: CREATE_PROJECT,
        variables: { createProjectInput },
      })
      .pipe(
        take(1),
        tap(() => this.setIsLoading(false)),
        catchError((error) => {
          this.setIsLoading(false);
          return throwError(() => error);
        }),
        tap((response) => {
          this.setProject(new Project(response.data.createProject));
        })
      );
  }
}
