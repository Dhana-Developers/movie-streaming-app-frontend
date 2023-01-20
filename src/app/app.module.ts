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

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ...AppStoreModule,
    IonicStorageModule.forRoot({name: '__appdb', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]}),
    NgxPayPalModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}