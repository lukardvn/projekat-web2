import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  currentId = this.authService.currentUser.nameid;
  ifFriend;
  alreadySent;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private friendshipService: FriendshipService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');  //id "trenutnog" korisnika, cita se iz urla: /edit-profile/X 
    this.userService.getUser(id).subscribe(result => { 
      this.user = result.data;
    }, err => {
      console.log(err)
    });

    this.friendshipService.checkIfFriend(id).subscribe(result => {
      this.ifFriend = result.data;
    }, err => {
      console.log(err);
    })
  }

  addFriend(user) {
    let fs = {
      UserId1: this.currentId,
      UserId2: user.id
    };

    this.friendshipService.addFriend(fs).subscribe((response: any) => {
      if (response.success === false)
        this.alreadySent = true;
      else
        this.router.navigateByUrl("/accounts/all");
    }, err => {
      console.log(err);
    });
  }

  unfriend(user){
    this.friendshipService.cancelRequest(user.id).subscribe(() => {
      this.router.navigateByUrl("/accounts/all");
    }, err => {
      console.log(err);
    });
  }

}
