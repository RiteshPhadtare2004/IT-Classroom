import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notice-page',
  templateUrl: './add-notice-page.component.html',
  styleUrls: ['./add-notice-page.component.css']
})
export class AddNoticePageComponent {
  formData: any = {
    title: '',
    description: '',
    createdBy: '',
    user: 'teacher' // Add user field here if it's needed by your backend
  };

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(){
    this.http.post('http://localhost:3000/api/notices/createNotice', this.formData).subscribe(
      (response: any) => {
        if (response.message === 'notice is posted') { // Check the response message
          this.router.navigate(['/home/notices']);
        } else {
          console.error('Notice creation failed:', response.message);
        }
      },
      (error) => {
        console.error('Notice creation error:', error);
        // Handle error
      }
    );

    // Optionally, reset the form
    this.resetForm();
  }

  resetForm(): void {
    this.formData.title = '';
    this.formData.description = '';
    this.formData.createdBy = '';
  }
}
