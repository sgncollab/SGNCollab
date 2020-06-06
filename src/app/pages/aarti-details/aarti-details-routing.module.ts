import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AartiDetailsPage } from './aarti-details.page';

const routes: Routes = [
  {
    path: '',
    component: AartiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AartiDetailsPageRoutingModule {}
