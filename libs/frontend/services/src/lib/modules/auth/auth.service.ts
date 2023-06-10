import { Injectable, Signal, computed } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { Apollo, MutationResult } from 'apollo-angular';
import { RefreshTokenInput, SignInInput, SignUpInput } from '../../inputs';
import { REFRESH_TOKENS, SIGN_IN, SIGN_UP } from './graphql';
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

export interface RefreshTokens {
  refreshTokens: GraphqlTypes.AccessToken;
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

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apollo: Apollo = inject(Apollo);
  private readonly hashingService: HashingService = inject(HashingService);
  private readonly state = new State(this.hashingService);

  private get currentUserSource(): BehaviorSubject<User> {
    return this.state.currentUser$;
  }

  get currentUser$(): Observable<User> {
    return this.currentUserSource.asObservable();
  }

  get currentUser(): Signal<User> {
    return toSignal(this.currentUser$);
  }

  get firstName$(): Observable<string> {
    return this.currentUser$.pipe(map((user) => user?.firstName));
  }

  get firstName(): Signal<string> {
    return toSignal(this.firstName$);
  }

  get lastName$(): Observable<string> {
    return this.currentUser$.pipe(map((user) => user.lastName));
  }

  get lastName(): Signal<string> {
    return toSignal(this.lastName$);
  }

  get fullName(): Signal<string> {
    return computed(() => `${this.firstName()} ${this.lastName()}`);
  }

  get isLogged$(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user));
  }

  get isLogged(): Signal<boolean> {
    return toSignal(this.isLogged$);
  }

  private get isLoadingSource(): BehaviorSubject<boolean> {
    return this.state.isLoading$;
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSource.asObservable();
  }

  get isLoading(): Signal<boolean> {
    return toSignal(this.isLoading$);
  }

  private get accessTokenSource(): BehaviorSubject<string> {
    return this.state.accessToken$;
  }

  get accessToken$(): Observable<string> {
    return this.accessTokenSource.asObservable();
  }

  get accessToken(): Signal<string> {
    return toSignal(this.accessToken$);
  }

  private get resfreshTokenSource(): BehaviorSubject<string> {
    return this.state.refreshToken$;
  }

  get refreshToken$(): Observable<string> {
    return this.resfreshTokenSource.asObservable();
  }

  get resfreshToken(): Signal<string> {
    return toSignal(this.refreshToken$);
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoadingSource.next(isLoading);
  }

  setAccessToken(accessToken: string): void {
    this.accessTokenSource.next(accessToken);
  }

  setRefreshToken(refreshToken: string): void {
    if (refreshToken) {
      localStorage.setItem(
        REFRESH_TOKEN,
        this.hashingService.encrypt(refreshToken)
      );
    } else {
      localStorage.removeItem(REFRESH_TOKEN);
    }
    this.resfreshTokenSource.next(refreshToken);
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
        take(1),
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

  refreshTokens(
    refreshTokenInput: RefreshTokenInput
  ): Observable<MutationResult<RefreshTokens>> {
    this.setIsLoading(true);
    return this.apollo
      .mutate<RefreshTokens, { refreshTokenInput: RefreshTokenInput }>({
        mutation: REFRESH_TOKENS,
        variables: { refreshTokenInput },
      })
      .pipe(
        take(1),
        catchError((error) => {
          this.setIsLoading(false);
          return throwError(() => error);
        }),
        tap((response) => {
          this.setAccessToken(response.data.refreshTokens.accessToken);
          this.setRefreshToken(response.data.refreshTokens.refreshToken);
          this.setCurrentUser(
            plainToClass(User, response.data.refreshTokens.user, {})
          );
        })
      );
  }
}
