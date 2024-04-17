import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
        } else {
          console.log('No userData found in local storage');
        }

    }
}
