import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  subject = new BehaviorSubject("Not Authorised")
  logIndata = new BehaviorSubject({})

  constructor() { }
  user = [
  {Name:'Admin', userName: 'Admin@gmail.com', password: 'Admin@123' },
  {Name:'Harshad Wagh', userName: 'harshad@tcs.com', password: 'tcs@123' },
  {Name:'Saurabh Wagh', userName: 'wagh@.com', password: 'wagh@123' }
  ];

  getReturnAdmin(data: any): Observable<any> {
    let temp = ''
    for (let i = 0; i < this.user.length; i++) {
      if (data.userName == this.user[i].userName && data.password == this.user[i].password) {
        temp = "ABCDFSHJ123"
        this.subject.next(temp)
        this.logIndata.next(this.user[i])
        break;
      }
      else {
        temp = 'Not Authorised'
      }
    }



    return of(temp);
  }

}
