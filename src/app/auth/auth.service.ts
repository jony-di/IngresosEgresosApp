import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import { from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
    });
  }

  crearUsuario(nomb: string, email: string, password: string) {
    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(resp => {
      const user: User = {
        uid: resp.user.uid,
        email: resp.user.email,
        nombre: nomb
      };
      console.log(user);
      this.afDB.doc(`${user.uid}/usuario`).set(user)
      .then(() => this.router.navigate(['/']))
      .catch(err => Swal('Error en el registro', err.message, 'error'));
    })
    .catch(err => Swal('Error en el registro', err.message, 'error'));
  }

  login(email: string, password: string) {
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(resp => this.router.navigate(['/']))
    .catch(err => Swal('Error en el login ', err.message, 'error'));
  }

  logout() {
    this.afAuth.auth
    .signOut()
    .then(resp => this.router.navigate(['/login']))
    .catch(err => Swal('Error en el logout ', err.message, 'error'));
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(fbUser => {
      if (fbUser == null) {
        this.router.navigate(['/login']);
      }
      return fbUser != null;
    }));
  }
}
