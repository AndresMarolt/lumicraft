import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
