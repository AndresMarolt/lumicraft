import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth/authResponse.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  @Output() changeAuthTypeEvent: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscriptions: Subscription[] = [];
  public loginError: boolean = false;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;
    this.subscriptions.push(
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: AuthResponse) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loginError = true;
          this.username.clearValidators();
          this.username.updateValueAndValidity();
          this.loginForm.reset();
          this.username.setValidators([Validators.required]);
          this.username.updateValueAndValidity();
          setTimeout(() => {
            this.loginError = false;
          }, 3000);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
