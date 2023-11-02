import {
  Component,
  Input,
  inject,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { COUNTRIES } from 'src/assets/countries';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  public editUserForm: FormGroup;
  public countries = COUNTRIES;
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private authService = inject(AuthService);
  @Input() user!: User;
  @Output() updateProfileData: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.editUserForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address: [null],
      city: [null],
      country: [null],
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
      country: this.user.country,
      phone: this.user.phone,
      date_of_birth: this.user.date_of_birth,
    });
  }

  submit() {
    if (this.editUserForm.invalid) return;

    const { id, role } = this.authService.decodeToken(
      this.authService.getToken()!
    )!;
    this.authService
      .updateUser({
        ...this.editUserForm.value,
        id,
        role,
        username: this.user.username,
      })
      .subscribe((response) => {
        console.log(response);
        const {
          first_name,
          last_name,
          address,
          city,
          country,
          phone,
          date_of_birth,
        } = response;
        this.user = {
          ...this.user,
          first_name,
          last_name,
          address,
          city,
          country,
          phone,
          date_of_birth,
        };
        this.authService.updateLocalStorageUserData(response);
        this.updateProfileData.emit();
      });

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

  get country() {
    return this.editUserForm.controls['country'];
  }

  get phone() {
    return this.editUserForm.controls['phone'];
  }

  get date_of_birth() {
    return this.editUserForm.controls['date_of_birth'];
  }
}
