import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateProjectInput } from '../../inputs';

class State {}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apollo: Apollo = inject(Apollo);
  private readonly state = new State();

  createProject(createProjectInput: CreateProjectInput) {}
}
