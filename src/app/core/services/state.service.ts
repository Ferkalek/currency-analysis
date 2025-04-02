import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  timeFrame$ = new BehaviorSubject<string>('1m');
  bulckRefresh$ = new Subject<void>();
}
