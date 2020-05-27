import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  //@Input() korisnici$: Observable<any>;
  //users$: Observable<User[]>;
  //user: User =  { Id: 1, Surname: "Radovan", PhoneNumber: "123",Email: "imejl", Password: "sifra", Name: "ime", City: "grad" };
  constructor(private userService: UserService, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];
    }, err => {console.log(err)});
  }

  delete(id: number) {  //subscribe unutar subscribe-a da bi bio realtime update liste
    //console.log(this.users);
    //let index = this.users.findIndex(u=>u.id == id);
    //console.log(index);
    this.userService.deleteSingle(id).subscribe(result => {
      //this.users.splice(id, 1);
      //console.log(id);
      //let index = this.users.findIndex(u=>u.Id == id);
      //console.log(index);
      this.users = [...result.data];
      //console.log(this.users);
      //this.users.splice(id,1);
      //console.log(this.users);
      // this.userService.getAll().subscribe(result => {
      //   this.users = [...result.data];
      // });
    });
  }
  
}