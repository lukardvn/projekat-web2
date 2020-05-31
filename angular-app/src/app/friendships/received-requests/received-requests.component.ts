import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.css']
})
export class ReceivedRequestsComponent implements OnInit {
  requests: Array<any> = [];

  constructor(private friendshipService: FriendshipService) { }

  ngOnInit(): void {
    this.friendshipService.getRequestsReceived().subscribe(result => {  //u data.user1 je onaj ko je poslao zahtev
      this.requests = result.data;
    })
  }

  acceptRequest(request) {
    let response = {
      UserId1: request.user1.id,
      Decision: true
    };
    this.friendshipService.respondToRequest(response).subscribe(() => {
      this.requests.splice(request.id, 1);
    });
  }

  rejectRequest(request) {
    let response = {
      UserId1: request.user1.id,
      Decision: false
    };
    this.friendshipService.respondToRequest(response).subscribe(() => {
      this.requests.splice(request.id, 1);
    });
  }

}
