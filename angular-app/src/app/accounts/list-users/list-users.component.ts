import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any;
  currentId = this.authService.currentUser.nameid;
  usersToShow;

  public displayedColumns: string[] = ['id', 'email', 'name', 'surname', 'city', 'phoneNumber', "actions", "actions2"];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private authService: AuthService,
              private friendshipService: FriendshipService,
              private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];;

      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    }, err => {console.log(err)});
  }

  delete(id: number) {  //subscribe unutar subscribe-a da bi bio realtime update liste
    //let index = this.users.findIndex(u=>u.id == id);
    this.userService.deleteSingle(id).subscribe(result => {
      //this.users.splice(id, 1);
      //let index = this.users.findIndex(u=>u.Id == id);
      this.users = [...result.data];
      //this.users.splice(id,1);
      // this.userService.getAll().subscribe(result => {
      //   this.users = [...result.data];
      // });
    });
  }

  addFriend(id){
    let fs = {
      UserId1: this.currentId,
      UserId2: id
    };

    this.friendshipService.addFriend(fs).subscribe(result => {
      console.log(result);
    })
  }
  
}