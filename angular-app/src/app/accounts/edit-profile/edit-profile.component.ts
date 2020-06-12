import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  form: FormGroup = new FormGroup({});
  changed = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(){
    this.generateForm();
    let id = this.authService.currentUser.nameid;
    //ovo moze da se koristi kod liste, kad ide redirekcija iz liste u EDIT        
    //let id = this.route.snapshot.paramMap.get('id');  //id "trenutnog" korisnika, cita se iz urla: /edit-profile/X  
    this.userService.getSingle(id).subscribe(result => {
      this.user = result.data;
      this.populateFields();
    }, err => {
      console.log(err)
    });
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['', 
              [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['']
    });
  }

  populateFields() {
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
      surname: this.user.surname,
      city: this.user.city,
      phone: this.user.phoneNumber,
      password: this.user.password
    });
  }

  saveChanges() {
    this.setProperties();
    /*this.user = new User({
      ...this.form.value
    });*/
    this.userService.updateSingle(this.user).subscribe(result => {
      if (result.success === true)
        this.changed  = true;
      else
        this.changed = false;
    });
  }

  setProperties(){
    this.user.email = this.form.value.email;
    this.user.name = this.form.value.name;
    this.user.surname = this.form.value.surname;
    this.user.city = this.form.value.city;
    this.user.password = this.form.value.password;
  }

  get f() {
    return this.form.controls;
  }
}