import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AartiListPage } from './aarti-list.page';

const routes: Routes = [
  {
    path: '',
    component: AartiListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AartiListPageRoutingModule {}
