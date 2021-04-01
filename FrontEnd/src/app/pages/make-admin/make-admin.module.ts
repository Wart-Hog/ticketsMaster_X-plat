import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeAdminPageRoutingModule } from './make-admin-routing.module';

import { MakeAdminPage } from './make-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeAdminPageRoutingModule
  ],
  declarations: [MakeAdminPage]
})
export class MakeAdminPageModule {}
