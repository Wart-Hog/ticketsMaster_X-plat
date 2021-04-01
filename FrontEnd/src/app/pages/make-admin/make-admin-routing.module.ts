import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeAdminPage } from './make-admin.page';

const routes: Routes = [
  {
    path: '',
    component: MakeAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeAdminPageRoutingModule {}
