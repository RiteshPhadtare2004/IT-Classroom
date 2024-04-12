import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  constructor(private router:Router){

  }
  isLogin: boolean = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  loginObj: any = {
    username: '',
    password: '',
  };

  onLogin() {
    if (
      this.loginObj.username == 'itclass' &&
      this.loginObj.password == '123'
    ) {
      this.router.navigateByUrl('/home')
    } else {
      alert('Wrong username or password');
    }
  }
}
