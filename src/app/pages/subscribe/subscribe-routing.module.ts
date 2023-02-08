import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribePage } from './subscribe.page';
import { SubscriptionpaypalComponent } from 'src/app/projects/component/subscriptionpaypal/subscriptionpaypal.component';

const routes: Routes = [
  {
    path: '',
    component: SubscribePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribePageRoutingModule {}
