import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  defferedPrompt: any = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log(e);
      this.defferedPrompt = e;
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
        .then(res => {
          this.router.navigateByUrl('home');
        }).catch(err => {
            alert('Não foi possível fazer login! Tente novamente');
            this.router.navigateByUrl('login');
        });
  }

  login(): void {
    if (!this.email || !this.password) {
      alert('Por favor, preencha os campos corretamente');
      return;
    } else {
      this.email = this.email.trim();
    }

    this.authService.loginWithEmailPassword(this.email, this.password)
      .then(res => {
        console.log(res);
        const user = this.authService.getUser();
        if (!user.emailVerified) {
          this.router.navigateByUrl('verificar-email');
        } else {
          this.router.navigateByUrl('home');
        }
      }).catch(err => {
        if (err.code === 'auth/wrong-password') {
          alert('A senha está errada');
        }
      });
  }

  download(): void {
    this.defferedPrompt.prompt();
    this.defferedPrompt.userChoice
      .then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('accepted installation');
        } else {
          console.log('user dismissed');
        }
      });
  }
}
