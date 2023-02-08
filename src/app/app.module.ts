import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Drivers } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/AppStoreModule';
import { StoreDevtools } from '@ngrx/store-devtools';
import { ProjectComponentModule } from './projects/component/project-component/project-component.module';
import { LoadingComponent } from './projects/component/loading/loading.component';
import { NgxRerenderModule } from 'ngx-rerender';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PayPalModule } from './paypal';
import { NgxPayPalModule } from 'ngx-paypal';
import {CdkStepperModule} from '@angular/cdk/stepper'; 
import { StepState } from '@angular/cdk/stepper';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ...AppStoreModule,
    IonicStorageModule.forRoot({name: '__appdb', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]}),
    PayPalModule.init({
      clientId: 'AdcMi5Pv2Yh6yWEJag2MtDxQRFzCoWfmbwaSb_X4bYdw_EDeiQ2JSLD4p5B0FRrzvwpESfISW3xA6IHD',
      currency: 'USD',
      integrationDate: '2023-01-19',
      // merchantId: 'AUk5FBaMYhZdFYX4qOJCaFqCef2FveyTZXc2yxqhuBfZv621bKU7uTham5CFjYnoAk5ir5sbHrOupTwY',
      commit: true
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}