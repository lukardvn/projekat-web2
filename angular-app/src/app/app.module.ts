import { AuthService } from './services/auth/auth.service';
import { FlightService } from './services/flight/flight.service';
import { UserService } from './services/user/user.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './accounts/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsNavbarComponent } from './common/bs-navbar/bs-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneFormatDirective } from './accounts/phone-format.directive';
import { LoginFormComponent } from './accounts/login-form/login-form.component';
import { EditProfileComponent } from './accounts/edit-profile/edit-profile.component';
import { ListUsersComponent } from './accounts/list-users/list-users.component';
import { FlightSearchComponent } from './flights/flight-search/flight-search.component';
import { ListDepartingFlightsComponent } from './flights/list-departing-flights/list-departing-flights.component';
import { ListReturningFlightsComponent } from './flights/list-returning-flights/list-returning-flights.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HomeComponent } from './accounts/home/home.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AdminAuthGuard } from './services/auth/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    BsNavbarComponent,
    PhoneFormatDirective,
    LoginFormComponent,
    EditProfileComponent,
    ListUsersComponent,
    FlightSearchComponent,
    ListDepartingFlightsComponent,
    ListReturningFlightsComponent,
    NavigationBarComponent,
    HomeComponent,
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
    UserService,
    FlightService,
    AuthService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
