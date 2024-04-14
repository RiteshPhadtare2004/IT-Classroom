import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ClassroomsComponent } from '../classrooms/classrooms.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent, ClassroomsComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
