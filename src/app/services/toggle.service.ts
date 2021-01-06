import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ToggleService{
  private toggleSubject = new BehaviorSubject<boolean>(true);
  toggleThings = this.toggleSubject.asObservable();

  constructor() {
  }

  toggle(toggleBoolean: boolean){
    this.toggleSubject.next(toggleBoolean);
  }
}
