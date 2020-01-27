import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, public authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(values: any) {
    console.log(values);
    this.authService.login(values.email, values.password);
  }

}
