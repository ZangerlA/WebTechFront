import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.registerForm = this.fb.group({
      username: [''],
      contact_email: [''],
      password: [''],
      password_control: [''],
      secret_code: ['']
    }, {validator: this.passwordValidator});
  }

  ngOnInit(): void {
  }

  tryRegister(): void {
    const val = this.registerForm.value;
    if (val.username && val.contact_email && val.password) {
      this.authService.signUp(val).subscribe((res) => {
        console.log(res);
        if (res.result) {
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      });
    }
  }

  passwordValidator(form: FormGroup): {} {
    const condition = form.get('password').value !== form.get('password_control').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
