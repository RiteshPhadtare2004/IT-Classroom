import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoticesComponent } from './components/notices/notices.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginSignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'classroom', pathMatch: 'full' },
      { path: 'classroom', component: ClassroomsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notices', component: NoticesComponent },
    ]
  },
];
