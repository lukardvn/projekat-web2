import { ReservationsModalComponent } from './../reservations-module/reservations-module.component';
import { FriendsModalComponent } from './../friends-module/friends-module.component';
import { FriendshipService } from './../../services/friendship/friendship.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css']
})
export class ListFriendsComponent implements OnInit {
  friends: any;

  constructor(private friendshipService: FriendshipService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.friendshipService.getFriends().subscribe(result => {
      this.friends = result.data;
    });
  }

  /*friendsReservations(friend) {
    this.friendshipService.myFriend = friend;
    this.router.navigate(['/friends/' + friend.id  + '/list-reservations']);
  }
  friendsFriends(friend) {
    this.friendshipService.myFriend = friend;
    this.router.navigate(['/friends/' + friend.id  + '/list-friends']);
  }*/

  showFriendsModule(friend) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = friend;

    this.dialog.open(FriendsModalComponent, dialogConfig);
  }

  showReservationsModule(friend) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = friend;

    this.dialog.open(ReservationsModalComponent, dialogConfig);
  }

  unfriend(friend) {
    this.friendshipService.cancelRequest(friend.id).subscribe(() => {
      this.friends = this.friends.filter(f => f !== friend);
    })
  }
}
