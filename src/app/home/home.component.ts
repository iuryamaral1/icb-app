import { AuthService } from './../login/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pregacao } from '../pregacao-audio/pregacao.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: any;
  showMenu: boolean;

  constructor(private authService: AuthService,
              public router: Router) {
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

  displayMenu(): void {
    this.showMenu = !this.showMenu;
  }

  redirectToAudioMessages(): void {
    this.router.navigateByUrl('/pregacao');
  }
}
