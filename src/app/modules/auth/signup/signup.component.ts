import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/auth/loginResponse.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  @Output() changeAuthTypeEvent: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      date_of_birth: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      phone: [null],
    });
  }

  submit() {
    if (this.signupForm.invalid) return;

    this.authService
      .signup({
        ...this.signupForm.value,
        phone: JSON.stringify(this.phone.value),
      })
      .subscribe({
        next: (data: LoginResponse) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.signupForm.reset();
        },
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

  get address() {
    return this.signupForm.controls['address'];
  }

  get city() {
    return this.signupForm.controls['city'];
  }

  get country() {
    return this.signupForm.controls['country'];
  }

  get date_of_birth() {
    return this.signupForm.controls['date_of_birth'];
  }

  get phone() {
    return this.signupForm.controls['phone'];
  }
}
