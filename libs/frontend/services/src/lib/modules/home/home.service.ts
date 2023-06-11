import { DestroyRef, Injectable, inject } from '@angular/core';
import { Project } from '../../models';
import { BehaviorSubject, Observable, withLatestFrom } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { FIND_MY_PROJECTS } from './graphql';
import { GraphqlTypes } from '@common/graphql';
import { ApolloQueryResult } from '@apollo/client/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

class State {
  myProjects$: BehaviorSubject<Project[]> = new BehaviorSubject([]);
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly apollo: Apollo = inject(Apollo);
  private readonly state = new State();

  private get myProjectsSource(): BehaviorSubject<Project[]> {
    return this.state.myProjects$;
  }

  get myProjects$(): Observable<Project[]> {
    return this.myProjectsSource.asObservable();
  }

  builMyProjects(destroyRef: DestroyRef): void {
    this.myProjectsSource.next([]);
    this.apollo
      .watchQuery<{ findProjects: GraphqlTypes.Project[] }>({
        query: FIND_MY_PROJECTS,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        withLatestFrom(this.myProjects$),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe(
        ([response, projects]: [
          ApolloQueryResult<{ findProjects: GraphqlTypes.Project[] }>,
          Project[]
        ]) => {
          this.myProjectsSource.next([
            ...projects,
            ...response.data.findProjects.map(
              (project) => new Project(project)
            ),
          ]);
        }
      );
  }
}
