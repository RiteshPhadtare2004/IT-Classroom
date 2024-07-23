import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  student:any = '';
  studentId : any= '';
  constructor(private http: HttpClient,private router: Router,) { }
  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      // Parse the JSON string back to an object
      const userData = JSON.parse(userDataString);
      this.studentId = userData.user_id;
     
    } else {
      console.log('No userData found in local storage');
    }
    console.log('this is student id '+this.studentId);
    this.http.get<any[]>('http://localhost:3000/api/profile/userProfile/' + this.studentId)
      .subscribe(
        (response) => {
          this.student = response;
        },
        (error) => {
          console.error('Error fetching classrooms:', error);
        }
      );
  }

}
