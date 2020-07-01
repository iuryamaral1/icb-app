import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserNameByEmail(email: string): string {
    firebase.database().ref('/users')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(res => {
        console.log(res);
        return res;
      }).catch(err => {
        console.log(err);
        return;
      });
      
      return;
  }
}
