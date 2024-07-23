import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  routes: any = '';
  type: string = '';
  id: any = '';
  constructor(private router: Router, private http: HttpClient) {}

  studentRoutes: any = {
    home: '/home',
    profile: '/home/profile',
    notices: '/home/notices',
  };

  teacherRoutes: any = {
    home: '/teacher',
    profile: '/home/profile',
    notices: '/home/notices',
    createClassroom: '/teacher/createClassroom',
  };

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      if (userData.role == 'student') {
        this.type = 'student';
        this.routes = this.studentRoutes;
      } else {
        this.type = 'teacher';
        this.routes = this.teacherRoutes;
      }
      this.id = userData.user_id;
      console.log(this.id);
    } else {
      console.log('No userData found in local storage');
    }
  }
}
