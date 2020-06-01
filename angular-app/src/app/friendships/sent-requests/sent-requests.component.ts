import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {
  requests: Array<any> = [];

  constructor(private friendshipService: FriendshipService) { }

  ngOnInit(): void {
    this.friendshipService.getRequestsSent().subscribe(result => {
      this.requests = result.data;
    })
  }

  cancelRequest(request) {
    this.friendshipService.cancelRequest(request.userId2).subscribe(() => {
      this.requests = this.requests.filter(req => req !== request);
    })
  }

}
