import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './services/student.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { SignupFormComponent } from './accounts/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsNavbarComponent } from './common/bs-navbar/bs-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneFormatDirective } from './accounts/phone-format.directive';
import { LoginFormComponent } from './accounts/login-form/login-form.component';
import { EditProfileComponent } from './accounts/edit-profile/edit-profile.component';
import { ListUsersComponent } from './accounts/list-users/list-users.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SignupFormComponent,
    BsNavbarComponent,
    PhoneFormatDirective,
    LoginFormComponent,
    EditProfileComponent,
    ListUsersComponent,
  ],
  exports: [
    PhoneFormatDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule  ],
  providers: [
    StudentService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
