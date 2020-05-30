import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

@Component({
  selector: 'app-friends-module',
  templateUrl: './friends-module.component.html',
  styleUrls: ['./friends-module.component.css']
})
export class FriendsModalComponent implements OnInit {
  friends;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private friendshipService: FriendshipService
  ) { }

  ngOnInit(): void {
    this.friendshipService.getUsersFriends(this.data.id).subscribe(result => {
      this.friends = result.data;
    });
  }
}
