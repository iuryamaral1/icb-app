import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
        .then(res => {
          if (res) {
            const user = res.user;
            localStorage.setItem('userPui', JSON.stringify(user));
            this.router.navigateByUrl('home');
          }
        }).catch(err => {
            alert('Não foi possível fazer login! Tente novamente');
            this.router.navigateByUrl('login');
        });
  }
}
