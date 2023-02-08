import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribePageRoutingModule } from './subscribe-routing.module';

import { SubscribePage } from './subscribe.page';
import { SubscriptionpaypalComponent } from 'src/app/projects/component/subscriptionpaypal/subscriptionpaypal.component';
import { ProjectComponentModule } from 'src/app/projects/component/project-component/project-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribePageRoutingModule,
    ProjectComponentModule
  ],
  declarations: [SubscribePage,]
})
export class SubscribePageModule {}
