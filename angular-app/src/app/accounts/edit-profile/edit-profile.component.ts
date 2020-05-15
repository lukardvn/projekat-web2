import { UserService } from 'src/app/services/user.service';
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
  
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(){
    this.generateForm();

    let id = this.route.snapshot.paramMap.get('id');  //id "trenutnog" korisnika, cita se iz urla: /edit-profile/X          
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
      phone: ['', Validators.required]
    });
  }

  populateFields() {
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
      surname: this.user.surname,
      city: this.user.city,
      phone: this.user.phoneNumber
    });
  }

  get f() {
    return this.form.controls;
  }
}
