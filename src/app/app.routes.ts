import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { EnrolledComponent } from './pages/enrolled/enrolled.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [{
    path: '',
    component: LoginComponent
},
{
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthService]
},
{
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [AuthService]
},
{
    path: 'enrolled',
    component: EnrolledComponent,
    canActivate: [AuthService]
}];
