import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  password: string;
  confirmPassword: string;
  name: string;

  constructor(public authService: AuthService,
              public router: Router) { }

  register(): void {
    if (!this.email) {
      alert('Por favor, preencha um email');
      return;
    }

    if (!this.password) {
      alert('Por favor, preencha a senha');
      return;
    }

    if (!this.confirmPassword) {
      alert('Por favor, preencha a confirmacao de senha');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('As senhas cadastradas não são iguais');
      return;
    }

    if (this.password.length < 6) {
      alert('Por favor, crie uma senha de mais de 4 dígitos');
    }

    if (this.email) {
      const re = new RegExp("^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$");
      if (!re.test(this.email)) {
        alert('Este email não é válido');
        return;
      }
    }

    this.authService.createAccountWithEmailPassword(this.email, this.password, this.name)
      .then(res => {
        console.log(res);
        alert('Conta cadastrada com sucesso');
        this.router.navigateByUrl('login');
      }).catch(err => {
        console.log(err);
        if (err.code === 'auth/weak-password') {
          alert('A senha precisa ter ao menos 6 dígitos');
        } else {
          alert('Não foi possível criar sua conta. Entre em contato com o administrador');
        }
      });
  }
}
