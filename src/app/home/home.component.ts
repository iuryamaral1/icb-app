import { AuthService } from './../login/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: any;
  dayName: string;

  constructor(private authService: AuthService,
              public router: Router) {
    this.user = JSON.parse(this.authService.getUser());
    if (this.user && this.user.displayName) {
      this.user.displayName = this.user.displayName.split(' ')[0];
    }
    this.dayName = this.getDayName(new Date().getDay());
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

  getDayName(value: number): string {
    switch (value) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-feira';
      case 2:
        return 'Terça-feira';
      case 3:
        return 'Quarta-feira';
      case 4:
        return 'Quinta-feira';
      case 5:
        return 'Sexta-feira';
      case 6:
        return 'Sábado';
    }
  }
}
