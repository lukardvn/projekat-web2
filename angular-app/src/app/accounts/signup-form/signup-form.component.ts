import { SignUpFormValidators } from './signup-form.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { 
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
    console.log(this.form.value);
    //this.form.setErrors({
     // invalidLogin: true
    //});
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
