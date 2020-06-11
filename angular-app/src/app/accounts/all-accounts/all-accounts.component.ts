import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {
  users: any;
  currentId = this.authService.currentUser.nameid;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];
    }, err => {console.log(err)});
  }
}
