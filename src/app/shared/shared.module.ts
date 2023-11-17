import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ConfirmationComponent, LoadingSpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoadingSpinnerComponent],
})
export class SharedModule {}
