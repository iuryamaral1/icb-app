import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
