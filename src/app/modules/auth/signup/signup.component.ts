import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  @Output() changeAuthTypeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get username() {
    return this.signupForm.controls['username'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get first_name() {
    return this.signupForm.controls['first_name'];
  }

  get last_name() {
    return this.signupForm.controls['last_name'];
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  submit() {}
}
