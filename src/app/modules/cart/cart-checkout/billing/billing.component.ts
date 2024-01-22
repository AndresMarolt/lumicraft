import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PROVINCES } from 'src/assets/provinces';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent {
  public billingForm!: FormGroup;
  public provinces = PROVINCES;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  @Output() changeStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateUserBillingData: EventEmitter<User> =
    new EventEmitter<User>();
  @Input() user!: User;

  constructor() {
    this.user = this.authService.getUser()!;
    this.billingForm = this.formBuilder.group({
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      city: [this.user.city, [Validators.required]],
      province: [this.user.province, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      date_of_birth: [this.user.date_of_birth],
    });
  }

  submit() {
    if (this.billingForm.valid) {
      this.changeStep.emit(1);
      this.updateUserBillingData.emit(this.billingForm.value);
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

  get province() {
    return this.billingForm.controls['province'];
  }

  get phone() {
    return this.billingForm.controls['phone'];
  }
}
