import { Injectable } from '@angular/core';
// import { Http } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(public http: HttpClient) {}

  private data = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<string>('Select User');
  castData = this.data.asObservable();
  passSelectedCast = this.user.asObservable();

  changeState(passsearchkey) {
    this.data.next(passsearchkey);
  }

  passtoSearch(passsearchkey) {
    this.user.next(passsearchkey);
  }

  getAllData() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users');
  }
}
