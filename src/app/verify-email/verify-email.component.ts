import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  user: any;

  constructor(public authService: AuthService,
              public router: Router,
              public userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigateByUrl('login');
    }
  }

  sendEmailVerification(): void {
    this.authService.sendEmailVerification()
      .then(res => {
        console.log(res);
        alert('E-mail enviado, por favor faça login novamente');
        this.authService.logout();
        this.router.navigateByUrl('login');
      }).catch(err => {
        alert('Houve um erro ao enviar o e-mail para este endereço. Verifique se digitou corretamente e refaça seu cadastro');
        this.router.navigateByUrl('login');
      });
  }
}
