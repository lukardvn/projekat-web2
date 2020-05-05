import { LoginFormComponent } from './../accounts/login-form/login-form.component';
import { SignupFormComponent } from './../accounts/signup-form/signup-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'signup-form', component: SignupFormComponent },
    { path: 'login-form', component: LoginFormComponent }
];