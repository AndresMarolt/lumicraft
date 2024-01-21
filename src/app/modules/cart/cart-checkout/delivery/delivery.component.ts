import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faHome, faShop, faPhone } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.interface';

enum DeliveryMethod {
  DOMICILIO = 'DOMICILIO',
  TIENDA = 'TIENDA',
}
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  private formBuilder = inject(FormBuilder);
  public deliveryMethodForm!: FormGroup;
  @Input() user!: User;
  @Output() goToNextStep: EventEmitter<number> = new EventEmitter<number>();
  public faHome = faHome;
  public faShop = faShop;
  public faPhone = faPhone;

  constructor() {
    this.deliveryMethodForm = this.formBuilder.group({
      method: [DeliveryMethod.DOMICILIO, [Validators.required]],
    });
  }

  nextStep() {
    if (this.deliveryMethodForm.valid) {
      this.goToNextStep.emit(2);
    }
  }

  previousStep() {
    this.goToNextStep.emit(0);
  }

  selectMethod(methodIndex: string) {
    this.deliveryMethodForm.patchValue({
      method: methodIndex,
    });
  }

  get method() {
    return this.deliveryMethodForm.controls['method'];
  }
}
