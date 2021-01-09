import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  registerError: string;

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
    if (val.username && val.contact_email && val.password && val.secret_code) {
      this.authService.signUp(val).subscribe(
        res => {
          if (res.status === 200) {
            this.registerError = res.body.message;
            this.registerForm.reset();
            this.router.navigate(['login']);
          }
        },
        err => {
            this.registerError = err.error.message;
        }
      );
    }
  }

  passwordValidator(form: FormGroup): {} {
    const condition = form.get('password').value !== form.get('password_control').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }

  backToLogin(): void{
    this.router.navigate(['/login']);
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
