import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { LoginModule } from '../../components/login/login.module';
import { SignUpModule } from 'src/app/components/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    LoginModule,
    SignUpModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
