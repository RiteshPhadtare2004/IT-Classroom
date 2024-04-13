import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ClassroomsComponent } from '../classrooms/classrooms.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ClassroomsComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
