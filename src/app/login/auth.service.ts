import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

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
        const user = firebase.auth().currentUser;
        if (user) {
            const emailVerified = firebase.auth().currentUser.emailVerified;
            return user != null && emailVerified;
        }

        return false;
    }

    getUser(): any {
        return firebase.auth().currentUser;
    }

    createAccountWithEmailPassword(email: string, password: string, name: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    this.createUserAccount(email, name);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }

    createUserAccount(email, name): void {
        const db = firebase.database();
        const userId = UUID.UUID();

        db.ref().child('users').set({
            id: userId,
            email: email,
            name: name
        });
    }

    accountExists(email: string): boolean {
        firebase.database().ref('/users')
            .orderByChild('name')
            .equalTo(email)
            .once('value')
            .then(res => {
                console.log(res);
                return res != null;
            }).catch(err => {
                console.log(err);
                return false;
            });
        return false;
    }

    sendEmailVerification(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                user.sendEmailVerification()
                .then(res => resolve(res))
                .catch(err => reject(err));
            });
        });
    }

    loginWithEmailPassword(email: string, pass: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    logout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signOut()
                .then(res => {
                    localStorage.removeItem('userPui');
                    localStorage.getItem('userPui');
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }
}
