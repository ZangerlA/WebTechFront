import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistAllUsersComponent } from './watchlist-all-users.component';

describe('WatchlistAllUsersComponent', () => {
  let component: WatchlistAllUsersComponent;
  let fixture: ComponentFixture<WatchlistAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistAllUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
