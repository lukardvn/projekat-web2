import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  //user: User =  { Id: 1, Surname: "Radovan", PhoneNumber: "123",Email: "imejl", Password: "sifra", Name: "ime", City: "grad" };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];
    }, err => {console.log(err)});
  }
  
}