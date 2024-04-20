import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-classroom',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './view-classroom.component.html',
  styleUrl: './view-classroom.component.css'
})

export class ViewClassroomComponent implements OnInit{
  classroomId: any;
  classroomFiles:any='';
  type:any='';
  constructor(private router: Router, private http: HttpClient,private formBuilder: FormBuilder,private route: ActivatedRoute) {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required] // Initialize file control with null
    });
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.classroomId = params.get('id')!;
      console.log('Classroom ID:', this.classroomId);
    });

    this.http.get<any[]>('http://localhost:3000/api/classroom/files/'+this.classroomId)
      .subscribe(
        (response) => {
          console.log(response)
          this.classroomFiles = response
        },
        (error) => {
          console.error('Error fetching classrooms:', error);
        }
      );

      const userDataString = localStorage.getItem('userData');
      if (userDataString !== null) {
        // Parse the JSON string back to an object
        const userData = JSON.parse(userDataString);
        if(userData.role == 'student'){
          this.type = 'student'
    
        }else{
          this.type = 'teacher'
          
        }
      } else {
        console.log('No userData found in local storage');
      }
  }

  uploadForm: FormGroup;
  file: any = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.get('file')?.setValue(file); // Set file value in form
    }
  }

  uploaddata() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')!.value);      
      formData.append('title', this.uploadForm.get('title')!.value);
      formData.append('description', this.uploadForm.get('title')!.value);

      this.http
        .post(`http://localhost:3000/api/classroom/upload/${this.classroomId}`, formData)
        .subscribe(
          (response: any) => {
            console.log('File uploaded successfully:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Upload error:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}