import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,LoginSignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT-Classroom';
  isLogin: boolean = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
