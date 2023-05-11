import { Injectable, Signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  finalize,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { Apollo, MutationResult } from 'apollo-angular';
import { SignUpInput } from '../../inputs';
import { SIGN_UP } from './graphql';
import { GraphqlTypes } from '@common/graphql';

class State {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  accessToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  refreshToken$: BehaviorSubject<string> = new BehaviorSubject(null);
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly state = new State();

  private get _currentUser$(): BehaviorSubject<User> {
    return this.state.currentUser$;
  }

  get currentUser(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  private get _isLoading$(): BehaviorSubject<boolean> {
    return this.state.isLoading$;
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  get isLoading(): Signal<boolean> {
    return toSignal(this.isLoading$);
  }

  private get _accessToken$(): BehaviorSubject<string> {
    return this.state.accessToken$;
  }

  get accessToken$(): Observable<string> {
    return this._accessToken$.asObservable();
  }

  get accessToken(): Signal<string> {
    return toSignal(this.accessToken$);
  }

  private get _resfreshToken$(): BehaviorSubject<string> {
    return this.state.refreshToken$;
  }

  get refreshToken$(): Observable<string> {
    return this._resfreshToken$.asObservable();
  }

  get resfreshToken(): Signal<string> {
    return toSignal(this.refreshToken$);
  }

  constructor(private readonly apollo: Apollo) {}

  setCurrentUser(user: User): void {
    this._currentUser$.next(user);
  }

  setIsLoading(isLoading: boolean): void {
    this._isLoading$.next(isLoading);
  }

  setAccessToken(accessToken: string): void {
    this._accessToken$.next(accessToken);
  }

  setRefreshToken(refreshToken: string): void {
    this._resfreshToken$.next(refreshToken);
  }

  signUp(
    signUpInput: SignUpInput
  ): Observable<MutationResult<GraphqlTypes.User>> {
    this.setIsLoading(true);
    return this.apollo
      .mutate<User, { signUpInput: SignUpInput }>({
        mutation: SIGN_UP,
        variables: { signUpInput },
      })
      .pipe(
        tap(() => this.setIsLoading(false)),
        catchError((error) => {
          this.setIsLoading(false);
          return throwError(() => error);
        })
      );
  }
}