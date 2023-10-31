import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/authResponse.interface';
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
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.signupForm.invalid) return;

    this.authService.signup(this.signupForm.value).subscribe({
      next: (data: AuthResponse) => {
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
}
