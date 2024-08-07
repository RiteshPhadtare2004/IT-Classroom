import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-cc',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterLink, CommonModule, FormsModule],
  templateUrl: './teacher-cc.component.html',
  styleUrl: './teacher-cc.component.css'
})
export class TeacherCCComponent implements OnInit {
  classrooms: any = '';
  studentId: any = '';
  classroombool: boolean = true;
  routes: any = {
    home: '/teacher',
    profile: '/home/profile',
    notices: '/home/notices',
    createClassroom: '/teacher/createClassroom',
  };

  constructor(private http: HttpClient, private router: Router,) { }

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

    this.http.get<any[]>('http://localhost:3000/api/classroom/displayTeacherClassroom/' + this.studentId)
      .subscribe(
        (classrooms) => {
          if(classrooms.length == 0){
            this.classroombool=false;
          }
          this.classrooms = classrooms;
        },
        (error) => {
          console.error('Error fetching classrooms:', error);
        }
      );
  }

  delete_classroom(classroomId: any) {
    console.log(`Classroom id ${classroomId}`)
    this.http.delete(`http://localhost:3000/api/classroom/delete/${classroomId}`).subscribe(
      (response: any) => {
        this.router.navigate(['/teacher/teacherClassroom']);
        window.location.reload();
      },
      (error) => {
        console.error('Delete error:', error);
      }
    );
  }

  send_classroom(classroomId: any) {
    this.router.navigate(['/home/viewclassroom', classroomId]);
  }

}
