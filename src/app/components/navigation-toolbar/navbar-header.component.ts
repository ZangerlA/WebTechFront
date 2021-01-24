import {Component, OnInit} from '@angular/core';
import {ToggleService} from '../../services/toggle.service';
import { AuthService } from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
  toggleIn: boolean;

  constructor(private toggleService: ToggleService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.toggleService.toggleThings.subscribe(tog => this.toggleIn = tog);
  }

  toggleDrawer(): void {
    this.toggleService.toggle(this.toggleIn);
  }

  logout(): void {
    this.authService.logout();
  }
}
