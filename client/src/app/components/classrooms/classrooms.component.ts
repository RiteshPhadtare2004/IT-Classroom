import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
    
  classrooms: any='';
  studentId: any='';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      // Parse the JSON string back to an object
      const userData = JSON.parse(userDataString);
      this.studentId = userData.user_id;
      this.fetchClassrooms(); // Call fetchClassrooms here
    } else {
      console.log('No userData found in local storage');
    }
  }

  fetchClassrooms() {
    if (!this.studentId) {
      console.error('Student ID not available');
      return;
    }

    this.http.get<any[]>('http://localhost:3000/api/classroom/displayClassroom/' + this.studentId)
      .subscribe(
        (classrooms) => {
          this.classrooms = classrooms;
        },
        (error) => {
          console.error('Error fetching classrooms:', error);
        }
      );
  }
}
