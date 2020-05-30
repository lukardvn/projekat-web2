import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  baseUrl = "https://localhost:44383/Friendship";
  myFriend;

  constructor(private http: HttpClient) { }

  getFriends(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetMyFriends`);
  }

  getUsersFriends(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetMyFriends/${id}`);
  }

  getRequestsReceived(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetRequestsReceived`);
  }

  getRequestsSent(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetRequestsSent`);
  }

  respondToRequest(response: any) {
    const body = JSON.stringify(response);
    return this.http.put(`${this.baseUrl}/RespondToRequest`, body);
  }

}