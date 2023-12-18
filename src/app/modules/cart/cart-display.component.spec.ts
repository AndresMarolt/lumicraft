import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDisplayComponent } from './cart-display.component';

describe('CartDisplayComponent', () => {
  let component: CartDisplayComponent;
  let fixture: ComponentFixture<CartDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDisplayComponent]
    });
    fixture = TestBed.createComponent(CartDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
