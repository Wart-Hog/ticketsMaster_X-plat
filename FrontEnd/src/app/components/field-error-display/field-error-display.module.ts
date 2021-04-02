import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FieldErrorDisplayComponent } from './field-error-display.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [FieldErrorDisplayComponent],
  exports: [FieldErrorDisplayComponent]
})
export class FieldErrorDisplayModule {}
