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

  constructor(private authService: AuthService,
              public router: Router) {
    this.user = JSON.parse(this.authService.getUser());
    console.log(this.user);
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

}
