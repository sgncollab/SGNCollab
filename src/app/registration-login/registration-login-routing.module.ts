import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationLoginPage } from './registration-login.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationLoginPageRoutingModule {}
