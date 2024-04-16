import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoticesComponent } from './components/notices/notices.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { TeacherCCComponent } from './components/teacher-cc/teacher-cc.component';

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
  },{
    path: 'teacher',
    component: TeacherLayoutComponent,
    children: [
      { path: '', redirectTo: 'teacherClassroom', pathMatch: 'full' },
      { path: 'teacherClassroom', component: TeacherCCComponent },
    ]
  },
];
