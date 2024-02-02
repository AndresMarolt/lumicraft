import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  private screenWidthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(window.innerWidth);
  private subscriptions: Subscription[] = [];
  public screenWidth$: Observable<number> =
    this.screenWidthSubject.asObservable();

  constructor() {
    this.subscriptions.push(
      fromEvent(window, 'resize').subscribe(() => {
        this.screenWidthSubject.next(window.innerWidth);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
