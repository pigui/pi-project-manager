import { Injectable, Signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { Apollo, MutationResult } from 'apollo-angular';
import { SignInInput, SignUpInput } from '../../inputs';
import { SIGN_IN, SIGN_UP } from './graphql';
import { GraphqlTypes } from '@common/graphql';
import { plainToClass } from 'class-transformer';
import { HashingService } from '../hashing/hashing.service';
import { inject } from '@angular/core';

const REFRESH_TOKEN = 'REFRESH_TOKEN';

export interface SignIn {
  signIn: GraphqlTypes.AccessToken;
}

export interface SignUp {
  signUp: GraphqlTypes.User;
}

class State {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  accessToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  refreshToken$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private readonly hashingService: HashingService) {
    this.loadInitData();
  }

  private loadInitData(): void {
    if (localStorage.getItem(REFRESH_TOKEN)) {
      this.refreshToken$.next(
        this.hashingService.decrypt(localStorage.getItem(REFRESH_TOKEN))
      );
    }
  }
}

@Injectable()
export class AuthService {
  private readonly apollo: Apollo = inject(Apollo);
  private readonly hashingService: HashingService = inject(HashingService);
  private readonly state = new State(this.hashingService);

  private get _currentUser$(): BehaviorSubject<User> {
    return this.state.currentUser$;
  }

  get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  get isLogged$(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user));
  }

  get isLogged(): Signal<boolean> {
    return toSignal(this.isLogged$);
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
    localStorage.setItem(
      REFRESH_TOKEN,
      this.hashingService.encrypt(refreshToken)
    );
    this._resfreshToken$.next(refreshToken);
  }

  signUp(signUpInput: SignUpInput): Observable<MutationResult<SignUp>> {
    this.setIsLoading(true);
    return this.apollo
      .mutate<SignUp, { signUpInput: SignUpInput }>({
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

  signIn(signInInput: SignInInput): Observable<MutationResult<SignIn>> {
    this.setIsLoading(true);
    return this.apollo
      .mutate<SignIn, { signInInput: SignInInput }>({
        mutation: SIGN_IN,
        variables: { signInInput },
      })
      .pipe(
        tap(() => this.setIsLoading(false)),
        catchError((error) => {
          this.setIsLoading(false);
          return throwError(() => error);
        }),
        tap((response) => {
          this.setAccessToken(response.data.signIn.accessToken);
          this.setRefreshToken(response.data.signIn.refreshToken);
          this.setCurrentUser(
            plainToClass(User, response.data.signIn.user, {})
          );
        })
      );
  }
}
