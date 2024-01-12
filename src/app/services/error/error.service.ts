import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new Subject<boolean>();

  error$ = this.errorSubject.asObservable();

  setError(hasError: boolean) {
    this.errorSubject.next(hasError);
  }
}
