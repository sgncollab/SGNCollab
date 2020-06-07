import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterPage } from '././login-register.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRegisterPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRegisterPageRoutingModule {}
