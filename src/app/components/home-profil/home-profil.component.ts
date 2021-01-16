import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-profil',
  templateUrl: './home-profil.component.html',
  styleUrls: ['./home-profil.component.css']
})
export class HomeProfilComponent implements OnInit {
  editProfil: FormGroup;
  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.editProfil = this.fb.group({
      username: [''],
      user_email: [''],
      password: [''],
      password_control: [''],
      description: ['']
    }, {validator: this.passwordValidator});
  }

  ngOnInit(): void {
  }
  edit(): void {

  }
  passwordValidator(form: FormGroup): {} {
    const condition = form.get('password').value !== form.get('password_control').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }
}
