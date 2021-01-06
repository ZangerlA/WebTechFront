import {Component, OnInit, ViewChild} from '@angular/core';
import {ToggleService} from "../../services/toggle.service";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-navbar-body',
  templateUrl: './navbar-body.component.html',
  styleUrls: ['./navbar-body.component.css']
})
export class NavbarBodyComponent implements OnInit {
  navHideShow: boolean;
  @ViewChild('sidenav', {static: true}) drawer: MatDrawer;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleService.toggleThings.subscribe(tog => this.drawer.toggle());
  }
}
