// login-signup.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent {
  constructor(private router: Router, private http: HttpClient) {}
  isLogin: boolean = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  formLogin: any = {
    emailLogin: '',
    passwordLogin: ''
  };

  userData: any = {
    user_id : '',
    username : '',
    email : '',
    role : '',
  }

  onLogin() {
    this.http.post('http://localhost:3000/api/login', this.formLogin).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log(`Role is ${response.user.role}`);
          
          this.userData = {
            user_id: response.user._id,
            username: response.user.username,
            email: response.user.email,
            role: response.user.role,
          }
          
          localStorage.setItem('userData', this.userData);

          if(response.user.role == 'student'){
            this.router.navigate(['/home']);
            
          }else{
            this.router.navigate(['/teacher']);

          }


        } else {
          console.error('Login failed:', response.message);
          // Handle login failure
        }
      },
      (error) => {
        console.error('Login error:', error);
        // Handle login error
      }
    );
  }

  formSignup: any = {
    username: '',
    email: '',
    password: '',
    role: '', // New field for user role
  };

  acceptTerms: boolean = false;

  onSignup() {
    if (!this.acceptTerms) {
      console.error('Please accept the terms & conditions');
      return;
    }

    this.http
      .post('http://localhost:3000/api/signup', this.formSignup)
      .subscribe(
        (response: any) => {
          if (response.message === 'User created successfully') {
            console.log('Signup successful');
            this.toggleForm();
          } else {
            console.error('Signup failed:', response.message);
            // Handle signup failure
          }
        },
        (error) => {
          console.error('Signup error:', error);
          // Handle signup error
        }
      );
  }
}
