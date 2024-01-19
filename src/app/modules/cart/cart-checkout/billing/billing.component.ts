import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { COUNTRIES } from 'src/assets/countries';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent {
  public user!: User;
  public billingForm!: FormGroup;
  public countries = COUNTRIES;
  @Output() goToNextStep: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.user = this.authService.getUser()!;
    this.billingForm = this.formBuilder.group({
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      city: [this.user.city, [Validators.required]],
      country: [this.user.country, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      date_of_birth: [this.user.date_of_birth],
    });
  }

  nextStep() {
    if (this.billingForm.valid) {
      this.goToNextStep.emit();
    }
  }

  get first_name() {
    return this.billingForm.controls['first_name'];
  }

  get last_name() {
    return this.billingForm.controls['last_name'];
  }

  get address() {
    return this.billingForm.controls['address'];
  }

  get city() {
    return this.billingForm.controls['city'];
  }

  get country() {
    return this.billingForm.controls['country'];
  }

  get phone() {
    return this.billingForm.controls['phone'];
  }
}
