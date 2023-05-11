import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';

class State {
  darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  fullLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}

@Injectable()
export class GeneralService {
  private readonly state = new State();

  private get _darkTheme$(): BehaviorSubject<boolean> {
    return this.state.darkTheme$;
  }

  get darkTheme$(): Observable<boolean> {
    return this._darkTheme$.asObservable();
  }

  get darkTheme(): Signal<boolean> {
    return toSignal(this.darkTheme$);
  }
  get _fullLoading$(): BehaviorSubject<boolean> {
    return this.state.fullLoading$;
  }

  get fullLoading$(): Observable<boolean> {
    return this._fullLoading$.asObservable();
  }

  get fullLoading(): Signal<boolean> {
    return toSignal(this.fullLoading$);
  }

  setDarkTheme(): void {
    this._darkTheme$.next(true);
  }

  setLightTheme(): void {
    this._darkTheme$.next(false);
  }

  setFullLoading(fullLoading: boolean): void {
    this._fullLoading$.next(fullLoading);
  }
}
