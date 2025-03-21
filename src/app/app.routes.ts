import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';

export const routes: Routes = [{
    path: '',
    component: LoginComponent
},
{
    path: 'overview',
    component: OverviewComponent
}];
