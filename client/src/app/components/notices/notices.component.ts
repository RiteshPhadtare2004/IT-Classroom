import { Component } from '@angular/core';
import { AddNoticeButtonComponent } from '../add-notice-button/add-notice-button.component';
import { AddNoticePageComponent } from '../add-notice-page/add-notice-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [AddNoticeButtonComponent,AddNoticePageComponent,HttpClientModule,CommonModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent {
  notices: any='';
  type:string= '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
        if (userDataString !== null) {
          // Parse the JSON string back to an object
          const userData = JSON.parse(userDataString);
          if(userData.role == 'student'){
            this.type = 'student'
          }else{
            this.type = 'teacher'
          }
          this.fetchNotices();
        } else {
          console.log('No userData found in local storage');
        }
    
  }

  fetchNotices() {
    this.http.get<any[]>('http://localhost:3000/api/notices/viewNotice')
      .subscribe(
        (notices) => {
          this.notices = notices;
        },
        (error) => {
          console.error('Error fetching notices:', error);
          console.log('Error response body:', error.error); // Log the response body
        }
      );
  }

  deleteNotice(noticeId: string) {
    this.http.delete<any[]>('http://localhost:3000/api/notices/deleteNotice/' + noticeId)
      .subscribe(
        () => {
          this.fetchNotices(); // Refresh notices after deletion
        },
        (error) => {
          console.error('Error deleting notice:', error);
        }
      );
}
}

