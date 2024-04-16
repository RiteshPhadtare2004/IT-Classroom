import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.css',
})
export class CreateClassroomComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  classData: any = {
    name: '',
    teacherId: '',
  };
  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      // Parse the JSON string back to an object
      const userData = JSON.parse(userDataString);
      this.classData.teacherId = userData.user_id;
      console.log(userData);
    } else {
      console.log('No userData found in local storage');
    }
  }


  createClass() {
    this.http
      .post('http://localhost:3000/api/classroom/create', this.classData)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/teacher/createClassroom']);
        },
        (error) => {
          console.error('Login error:', error);
          // Handle login error
        }
      );

    // Optionally, reset the form
    this.resetForm();
  }

  resetForm(): void {
    this.classData.name = '';
  }
}
