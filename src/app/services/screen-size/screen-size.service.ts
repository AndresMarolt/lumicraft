import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private screenWidthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(window.innerWidth);
  public screenWidth$: Observable<number> =
    this.screenWidthSubject.asObservable();

  constructor() {
    fromEvent(window, 'resize').subscribe(() => {
      this.screenWidthSubject.next(window.innerWidth);
    });
  }
}
