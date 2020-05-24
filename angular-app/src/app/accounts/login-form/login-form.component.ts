import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../signup-form/signup-form.component.css'] //isti stil kao i za signup-form
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  invalidLogin: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) { }  //da bismo pristupili route parametrima - ActivatedRoute

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', 
              [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  logIn(form) {
    console.log(form);
  }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {  //result je tipa bool, true ako je uspesan login, false ako nije
          this.invalidLogin = false;
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl'); //izvlaci url iz auth-guard 
          this.router.navigate([returnUrl || '/home']);
      }, err => {
        console.log(err.error.message);
        this.invalidLogin = true;
      });
  }

}
