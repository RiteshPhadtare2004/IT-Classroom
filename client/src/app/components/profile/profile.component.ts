import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, CommonModule, FormsModule, HttpClientModule],
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
  type: any = 'teacher';
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.studentId = userData.user_id;
      if (userData.role == 'student') {
        this.type = 'student'

      } else {
        this.type = 'teacher'
      }

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

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadProfilePicture();
    }
  }

  uploadProfilePicture(): void {
    if (!this.selectedFile || !this.student.email) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const encodedEmail = encodeURIComponent(this.student.email); // safe for URL
    const uploadUrl = `http://localhost:3000/api/profile/uploadPhoto?email=${encodedEmail}`;

    this.http.post<any>(uploadUrl, formData).subscribe({
      next: (res) => {
        this.student.profilePicture = res.imageUrl; // Preview update
        alert('Profile picture updated!');
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Profile picture upload failed.');
      }
    });
  }


}
