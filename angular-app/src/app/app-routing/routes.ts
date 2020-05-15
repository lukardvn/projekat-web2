import { ListUsersComponent } from './../accounts/list-users/list-users.component';
import { StudentComponent } from './../student/student.component';
import { EditProfileComponent } from '../accounts/edit-profile/edit-profile.component';
import { LoginFormComponent } from '../accounts/login-form/login-form.component';
import { SignupFormComponent } from '../accounts/signup-form/signup-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'signup-form', component: SignupFormComponent },
    { path: 'login-form', component: LoginFormComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'students', component: StudentComponent},
    { path: 'list-users', component: ListUsersComponent}
];