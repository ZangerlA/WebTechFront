import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ProfileEditService} from '../../services/profil.edit.service';
import {Profile} from '../../models/profile.model';

@Component({
  selector: 'app-home-profil',
  templateUrl: './home-profil.component.html',
  styleUrls: ['./home-profil.component.css']
})
export class HomeProfilComponent implements OnInit {
  editProfil: FormGroup;
  profile: Profile = new Profile();



  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router, public profileEditService: ProfileEditService) {
    this.editProfil = this.fb.group({
      username: [''],
      user_email: [''],
      password: [''],
      password_control: [''],
      description: [''],
      img_Url: ['']
    }, {validator: this.passwordValidator});
  }

  ngOnInit(): void {
    this.getProfil();
  }

  getProfil(): void{
    this.profileEditService.getProfil().subscribe(res => {
      this.profile.id = res.body.id;
      this.profile.name =res.body.username;
      this.profile.imgUrl = res.body.profileImgUrl;
      this.profile.description = res.body.userDescription;
      this.profile.email =res.body.contact_email;
    })
  }

  edit(): void {

    this.profileEditService.putProfil('username', this.editProfil.value.username).subscribe(res => console.log(res));
    this.profileEditService.putProfil('contact_email', this.editProfil.value.user_email).subscribe(res => console.log(res));
    this.profileEditService.putProfil('pwHash', this.editProfil.value.password).subscribe(res => console.log(res));
    this.profileEditService.putProfil('profileImgUrl', this.editProfil.value.img_Url).subscribe(res => console.log(res));
    this.profileEditService.putProfil('userDescription', this.editProfil.value.description).subscribe(res => console.log(res));
  }
  passwordValidator(form: FormGroup): {} {
    const condition = form.get('password').value !== form.get('password_control').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }
}
