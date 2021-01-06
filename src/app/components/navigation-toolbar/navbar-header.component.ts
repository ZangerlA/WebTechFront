import {Component, OnInit} from '@angular/core';
import {ToggleService} from "../../services/toggle.service";

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
  toggleIn: boolean;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleService.toggleThings.subscribe(tog => this.toggleIn = tog);
  }

  toggleDrawer(): void {
    this.toggleService.toggle(this.toggleIn);
  }
}
