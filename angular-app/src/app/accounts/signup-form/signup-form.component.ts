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
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required]
    }, {
      validator: SignUpFormValidators.ConfirmedPassword('password', 'confirmPassword')    
    });
  }

  get f() { return this.form.controls; }

  //samo za demonstraciju
  signUp() {
    //console.log(this.form.value); //ovo this.form.value treba sada kastovati u User i nad tim userom pozvati post
    //this.form.setErrors({
     // invalidLogin: true
    //});
    this.userService.addSingle(this.form.value).subscribe(result => {
      console.log(result);
    });
    this.router.navigateByUrl('/list-users');
  }

  resetForm() {
    this.form.reset();
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
