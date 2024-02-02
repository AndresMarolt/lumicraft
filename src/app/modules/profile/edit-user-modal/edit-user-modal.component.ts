import {
  Component,
  Input,
  inject,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PROVINCES } from 'src/assets/provinces';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit, OnDestroy {
  public editUserForm: FormGroup;
  public provinces = PROVINCES;
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private authService = inject(AuthService);
  private subscriptions: Subscription[] = [];
  @Input() user!: User;
  @Output() updateProfileData: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.editUserForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address: [null],
      city: [null],
      province: [null],
      zipCode: [null],
      phone: [null],
      date_of_birth: [null],
    });
  }

  ngOnInit(): void {
    this.editUserForm.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      address: this.user.address,
      city: this.user.city,
      province: this.user.province,
      zipCode: this.user.zipCode,
      phone: this.user.phone,
      date_of_birth: this.user.date_of_birth,
    });
  }

  submit() {
    if (this.editUserForm.invalid) return;

    const { id, role } = this.authService.decodeToken(
      this.authService.getToken()!
    )!;
    this.subscriptions.push(
      this.authService
        .updateUser({
          ...this.editUserForm.value,
          id,
          role,
          username: this.user.username,
        })
        .subscribe((response) => {
          const {
            first_name,
            last_name,
            address,
            city,
            province,
            zipCode,
            phone,
            date_of_birth,
          } = response;
          this.user = {
            ...this.user,
            first_name,
            last_name,
            address,
            city,
            province,
            zipCode,
            phone,
            date_of_birth,
          };
          this.authService.updateLocalStorageUserData(response);
          this.updateProfileData.emit();
        })
    );

    this.dialogRef.close();
  }

  get first_name() {
    return this.editUserForm.controls['first_name'];
  }

  get last_name() {
    return this.editUserForm.controls['last_name'];
  }

  get address() {
    return this.editUserForm.controls['address'];
  }

  get city() {
    return this.editUserForm.controls['city'];
  }

  get province() {
    return this.editUserForm.controls['province'];
  }

  getZipCode() {
    return this.editUserForm.controls['zipCode'];
  }
  get phone() {
    return this.editUserForm.controls['phone'];
  }

  get date_of_birth() {
    return this.editUserForm.controls['date_of_birth'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
