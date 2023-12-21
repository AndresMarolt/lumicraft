import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedirectModalComponent } from './login-redirect-modal.component';

describe('LoginRedirectModalComponent', () => {
  let component: LoginRedirectModalComponent;
  let fixture: ComponentFixture<LoginRedirectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRedirectModalComponent]
    });
    fixture = TestBed.createComponent(LoginRedirectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
