import { UsernameValidators } from './username.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        UsernameValidators.cannotContainSpace
        ], 
        UsernameValidators.shouldBeUnique),
      password: new FormControl('', Validators.required)
    })   
  });

  constructor() { }

  get username() {
    return this.form.get('account.username');
  }

  get password() {
    return this.form.get('account.password');
  }

  //poziv serveru preko servisa koji vraca true ili false
  /*login() {
    let isValid = authService.login(this.form.value);
    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true;
      });
      //this.username.setErrors;
    }
  }*/

  //samo za demonstraciju
  login() {
    console.log(this.form.value);
    this.form.setErrors({
      invalidLogin: true
    });

  }
}
