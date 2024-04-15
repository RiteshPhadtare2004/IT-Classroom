import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-notice-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-notice-page.component.html',
  styleUrl: './add-notice-page.component.css'
})
export class AddNoticePageComponent {
  constructor(private router: Router, private http: HttpClient) {}
  fromdata: any = {
    title: '',
    description: '',
    createdBy: ''
  };

  onSubmit(){
    this.http.post('http://localhost:3000/api/notices/createNotice', this.fromdata).subscribe(
      (response: any) => {
        if (response.token) {
          this.router.navigate(['/home/notices']);
        } else {
          console.error('upload failed', response.message);
        }
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
    this.fromdata.title = '';
    this.fromdata.description = '';
    this.fromdata.createdBy = '';
  }
}
