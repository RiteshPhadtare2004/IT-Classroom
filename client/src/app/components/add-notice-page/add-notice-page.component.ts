import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-notice-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-notice-page.component.html',
  styleUrl: './add-notice-page.component.css'
})
export class AddNoticePageComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  data: any = ''
  ngOnInit(): void {
    // Retrieve the JSON string from local storage
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      // Parse the JSON string back to an object
      const userData = JSON.parse(userDataString);
      this.fromdata.user = userData.user_id;
      console.log(userData);
    } else {
      console.log('No userData found in local storage');
    }

  }
  fromdata: any = {
    title: '',
    description: '',
    createdBy: '',
    user: ''
  };


  onSubmit() {

    this.http.post('http://localhost:3000/api/notices/createNotice', this.fromdata).subscribe(
      (response: any) => {
          this.router.navigate(['/home/notices']);
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
