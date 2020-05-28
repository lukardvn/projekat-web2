import { ReservationService } from './services/reservation/reservation.service';
import { AuthService } from './services/auth/auth.service';
import { FlightService } from './services/flight/flight.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AdminAuthGuard } from './services/auth/admin-auth-guard.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneFormatDirective } from './accounts/phone-format.directive';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './accounts/signup-form/signup-form.component';
import { LoginFormComponent } from './accounts/login-form/login-form.component';
import { EditProfileComponent } from './accounts/edit-profile/edit-profile.component';
import { ListUsersComponent } from './accounts/list-users/list-users.component';
import { FlightSearchComponent } from './flights/flight-search/flight-search.component';
import { ListDepartingFlightsComponent } from './flights/list-departing-flights/list-departing-flights.component';
import { ListReturningFlightsComponent } from './flights/list-returning-flights/list-returning-flights.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { HomeComponent } from './accounts/home/home.component';
import { ListReservationsComponent } from './reservations/list-reservations/list-reservations.component';

import { TokenInterceptor } from './shared/auth/token.interceptor';
import { ReservationSummaryComponent } from './reservations/reservation-summary/reservation-summary.component';
import { SuccessComponent } from './reservations/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    PhoneFormatDirective,
    LoginFormComponent,
    EditProfileComponent,
    ListUsersComponent,
    FlightSearchComponent,
    ListDepartingFlightsComponent,
    ListReturningFlightsComponent,
    NavigationBarComponent,
    HomeComponent,
    ListReservationsComponent,
    ReservationSummaryComponent,
    SuccessComponent
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
    NgbModule  
  ],
  providers: [
    UserService,
    FlightService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    ReservationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
