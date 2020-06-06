import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AartiReorderPage } from './aarti-reorder.page';

const routes: Routes = [
  {
    path: '',
    component: AartiReorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AartiReorderPageRoutingModule {}
