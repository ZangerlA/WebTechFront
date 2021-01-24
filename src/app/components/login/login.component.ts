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

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
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
            this.router.navigate(['']);
          });
    }
  }
  createAccount(): void{
    this.router.navigate(['/register']);
  }
}

