import { Component } from '@angular/core';

@Component({
  selector: 'app-view-classroom',
  standalone: true,
  imports: [],
  templateUrl: './view-classroom.component.html',
  styleUrl: './view-classroom.component.css'
})

export class ViewClassroomComponent {
  classroomId: string = "YOUR_CLASSROOM_ID";
}
