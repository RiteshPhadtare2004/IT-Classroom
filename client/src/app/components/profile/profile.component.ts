import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  student: any = {
    name: '',
    email: '',
    role: '',
    roll: '',
    academicYear: '',
    gender: '',
    bio: ''
  };

  studentId: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.studentId = userData.user_id;

      this.getProfileData(this.studentId);
    } else {
      console.warn('No user data found in localStorage.');
    }
  }

  getProfileData(studentId: string): void {
    this.http.get<any>('http://localhost:3000/api/profile/userProfile/' + studentId)
      .subscribe({
        next: (response) => {
          this.student = {
            ...this.student,
            ...response
          };
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });
  }

  saveProfile(): void {
    this.http.post('http://localhost:3000/api/profile/updateProfile/' + this.studentId, this.student)
      .subscribe({
        next: (response) => {
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error saving profile:', err);
          alert('Failed to update profile.');
        }
      });
  }
}
