import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  tryLogin(): void {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.signIn(val).subscribe(
        loginJson => {
          localStorage.setItem('id', loginJson.body.id);
          this.authService.getUserProfile(loginJson.body.id).subscribe((userJson: any) => {
            localStorage.setItem('currentUser', userJson.body);
            this.router.navigate(['']);
          });
        },
        err => {
          this.loginError = err.error.message;
        }
      );
    }
  }
  createAccount(): void{
    this.router.navigate(['/register']);
  }
}

