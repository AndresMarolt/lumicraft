import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersModalComponent } from './user-orders-modal.component';

describe('UserOrdersModalComponent', () => {
  let component: UserOrdersModalComponent;
  let fixture: ComponentFixture<UserOrdersModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOrdersModalComponent]
    });
    fixture = TestBed.createComponent(UserOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
