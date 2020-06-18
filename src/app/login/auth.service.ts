import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(public afAuth: AngularFireAuth) { }

    loginWithGoogle(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().languageCode = 'pt';
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithPopup(provider)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    isAuthenticated(): boolean {
        const user = localStorage.getItem('userPui');
        return user != null;
    }

    getUser(): any {
        return localStorage.getItem('userPui');
    }

    logout(): boolean {
        localStorage.removeItem('userPui');
        const user = localStorage.getItem('userPui');
        return !user;
    }
}