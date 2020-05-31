import { SentRequestsComponent } from './../friendships/sent-requests/sent-requests.component';
import { ReceivedRequestsComponent } from './../friendships/received-requests/received-requests.component';
import { CommonModule } from '@angular/common';
import { ListFriendsComponent } from './../friendships/list-friends/list-friends.component';
import { SuccessComponent } from './../reservations/success/success.component';
import { ReservationSummaryComponent } from './../reservations/reservation-summary/reservation-summary.component';
import { ListReservationsComponent } from './../reservations/list-reservations/list-reservations.component';
import { HomeComponent } from './../accounts/home/home.component';
import { ListReturningFlightsComponent } from './../flights/list-returning-flights/list-returning-flights.component';
import { ListDepartingFlightsComponent } from './../flights/list-departing-flights/list-departing-flights.component';
import { FlightSearchComponent } from './../flights/flight-search/flight-search.component';
import { ListUsersComponent } from './../accounts/list-users/list-users.component';
import { EditProfileComponent } from '../accounts/edit-profile/edit-profile.component';
import { LoginFormComponent } from '../accounts/login-form/login-form.component';
import { SignupFormComponent } from '../accounts/signup-form/signup-form.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth-guard.service';

export const routes: Routes = [
    { path: 'signup-form', component: SignupFormComponent },
    { path: 'login-form', component: LoginFormComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'list-users', 
      component: ListUsersComponent, 
      canActivate: [AuthGuard /*, AdminAuthGuard */]
    },
    { path: 'home', component: HomeComponent},

    { path: 'flights' , component: FlightSearchComponent},
    { path: 'departing-flights', component: ListDepartingFlightsComponent },
    { path: 'returning-flights', component: ListReturningFlightsComponent },
    
    //{ path: 'friends/:id/list-reservations', component: FriendReservationsComponent },
    { path: 'list-reservations', 
      component: ListReservationsComponent,
      canActivate: [AuthGuard] 
    },
    { path: 'reservation-summary', component: ReservationSummaryComponent},
    { path: 'reservation-summary/success', component: SuccessComponent},

    //{ path: 'friends/:id/list-friends', component: FriendFriendsComponent},
    { path: 'friends', component: ListFriendsComponent },
    { path: 'friends/requests-received', component: ReceivedRequestsComponent},
    { path: 'friends/requests-sent', component: SentRequestsComponent }
];