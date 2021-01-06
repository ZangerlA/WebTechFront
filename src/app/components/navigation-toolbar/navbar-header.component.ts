import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
  toggleIn: boolean = true;
  @Output() toggle = new EventEmitter<boolean>();

  constructor() { }
  toggleDrawer(): void {
    if (this.toggleIn === true){
      this.toggleIn = false;
    }
    else {
      this.toggleIn = true;
    }
    this.toggle.emit(this.toggleIn);
  }
  ngOnInit(): void {
  }
}
