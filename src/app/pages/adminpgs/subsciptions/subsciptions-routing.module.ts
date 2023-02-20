import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubsciptionsPage } from './subsciptions.page';

const routes: Routes = [
  {
    path: '',
    component: SubsciptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubsciptionsPageRoutingModule {}
