import { Component } from '@angular/core';
import { AddNoticeButtonComponent } from '../add-notice-button/add-notice-button.component';
import { AddNoticePageComponent } from '../add-notice-page/add-notice-page.component';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [AddNoticeButtonComponent,AddNoticePageComponent],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent {

}
