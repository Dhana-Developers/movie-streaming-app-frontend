import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ProjectComponentModule } from '../projects/component/project-component/project-component.module';
import { PayPalButtons, PayPalModule } from '../paypal';
import { SubscriptionpaypalComponent } from '../projects/component/subscriptionpaypal/subscriptionpaypal.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ProjectComponentModule,
    // NgxPayPalModule,
    PayPalModule.init({
      clientId: 'AUk5FBaMYhZdFYX4qOJCaFqCef2FveyTZXc2yxqhuBfZv621bKU7uTham5CFjYnoAk5ir5sbHrOupTwY',
      currency: 'USD',
      integrationDate: '2023-01-19',
      // merchantId: 'AUk5FBaMYhZdFYX4qOJCaFqCef2FveyTZXc2yxqhuBfZv621bKU7uTham5CFjYnoAk5ir5sbHrOupTwY',
      commit: true
    })
  ],
  declarations: [Tab2Page, SubscriptionpaypalComponent]
})
export class Tab2PageModule {}
