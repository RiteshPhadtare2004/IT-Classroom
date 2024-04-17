import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent,NavbarComponent,CommonModule, FormsModule, HttpClientModule],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css'
})
export class TeacherLayoutComponent {

}
