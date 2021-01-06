import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-body',
  templateUrl: './navbar-body.component.html',
  styleUrls: ['./navbar-body.component.css']
})
export class NavbarBodyComponent implements OnInit {
  hidden: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  receiveToggleEv(toggle): void{
    this.hidden = toggle;
  }
}
