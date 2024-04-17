import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    routes:any='';
    type:string=''
    id:any=''
    joinClassroomData:any={
      studentId : '',
      classroomId: ''
    }
    constructor(private router: Router, private http: HttpClient) { }

    studentRoutes : any = {
      'home':'/home',
      'profile':'/home/profile',
      'notices': '/home/notices'
    };
    
    teacherRoutes : any={
      'home':'/teacher',
      'profile':'#',
      'notices': '/home/notices',
      'createClassroom': '/teacher/createClassroom'
    }
    ngOnInit(): void {
        const userDataString = localStorage.getItem('userData');
        if (userDataString !== null) {
          // Parse the JSON string back to an object
          const userData = JSON.parse(userDataString);
          if(userData.role == 'student'){
            this.type = 'student'
            this.routes = this.studentRoutes
          }else{
            this.type = 'teacher'
            this.routes = this.teacherRoutes
          }
          this.id = userData.user_id
          console.log(this.id)
        } else {
          console.log('No userData found in local storage');
        }
    }
    
    joinClassroom(){
      this.joinClassroomData.studentId = this.id;
      this.http.post('http://localhost:3000/api/classroom/join',this.joinClassroomData).subscribe(
        (response: any) => {
          window.location.reload();
        },
        (error: any) => {
          console.error('Join Classroom error:', error);
        }
      );
    }
}
