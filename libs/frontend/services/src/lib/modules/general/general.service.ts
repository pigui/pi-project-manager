import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { HashingService } from '../hashing/hashing.service';
const CURRENT_PAGE = 'CURRENT_PAGE';
const DART_THEME = 'DARK_THEME';

class State {
  darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  fullLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentPage$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private readonly hashingService: HashingService) {
    this.loadInitData();
  }

  loadInitData(): void {
    if (localStorage.getItem(CURRENT_PAGE)) {
      this.currentPage$.next(
        this.hashingService.decrypt(localStorage.getItem(CURRENT_PAGE))
      );
    }
    if (localStorage.getItem(DART_THEME)) {
      this.darkTheme$.next(!!localStorage.getItem(DART_THEME));
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private readonly hashingService: HashingService = inject(HashingService);
  private readonly state = new State(this.hashingService);

  private get darkThemeSource(): BehaviorSubject<boolean> {
    return this.state.darkTheme$;
  }

  get darkTheme$(): Observable<boolean> {
    return this.darkThemeSource.asObservable();
  }

  get darkTheme(): Signal<boolean> {
    return toSignal(this.darkTheme$);
  }
  get fullLoadingSource(): BehaviorSubject<boolean> {
    return this.state.fullLoading$;
  }

  get fullLoading$(): Observable<boolean> {
    return this.fullLoadingSource.asObservable();
  }

  get fullLoading(): Signal<boolean> {
    return toSignal(this.fullLoading$);
  }

  private get currentPageSource(): BehaviorSubject<string> {
    return this.state.currentPage$;
  }

  get currentPage$(): Observable<string> {
    return this.currentPageSource.asObservable();
  }

  get currentPage(): Signal<string> {
    return toSignal(this.currentPage$);
  }

  setDarkTheme(): void {
    localStorage.setItem(DART_THEME, 'true');
    this.darkThemeSource.next(true);
  }

  setLightTheme(): void {
    localStorage.setItem(DART_THEME, 'false');
    this.darkThemeSource.next(false);
  }

  setFullLoading(fullLoading: boolean): void {
    this.fullLoadingSource.next(fullLoading);
  }

  setCurrentPage(page: string): void {
    localStorage.setItem(CURRENT_PAGE, this.hashingService.encrypt(page));
    this.currentPageSource.next(page);
  }
}
