import { UserService } from 'src/app/services/user.service';
import { SignUpFormValidators } from './signup-form.validators';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private router: Router) { 
 }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', 
              [Validators.required, Validators.email],
              SignUpFormValidators.ShouldBeUnique],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    }, {
      validator: SignUpFormValidators.ConfirmedPassword('password', 'confirmPassword')    
    });
  }

  get f() { return this.form.controls; }

  signUp() {
    //this.form.setErrors({
     // invalidLogin: true
    //});
    let newUser = new User({
      ...this.form.value
    });

    //ako je result.success === false onda korisnik vec postoji
    this.userService.registerSingle(newUser).subscribe(() => {
      this.userService.getAll().subscribe
    });

    this.router.navigateByUrl('/list-users');
  }

  resetForm() { //u komentaru je proba provere da li username postoji async
    this.form.reset();
    
    /*this.userService.userExists(this.form.value.email).subscribe(result => {
      console.log(result);
    })*/
  }
  //poziv serveru preko servisa koji vraca true ili false
  /*signUp() {
    let isValid = authService.login(this.form.value);
    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true;
      });
      //this.username.setErrors;
    }
  }*/

}
