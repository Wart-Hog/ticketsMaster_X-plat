import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MusicComponent } from './music.component';
import { FieldErrorDisplayModule } from '../field-error-display/field-error-display.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FieldErrorDisplayModule
  ],
  declarations: [MusicComponent],
  exports: [MusicComponent]
})
export class MusicModule {}
