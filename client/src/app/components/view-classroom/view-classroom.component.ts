import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-classroom',
  standalone: true,
  imports: [],
  templateUrl: './view-classroom.component.html',
  styleUrl: './view-classroom.component.css'
})

export class ViewClassroomComponent {
  classroomId: any='';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve the classroomId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.classroomId = params.get('id');
      console.log('Classroom ID:', this.classroomId);
      // Now you can use this.classroomId in your component logic
    });
  }
}
