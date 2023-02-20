import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubsciptionsPageRoutingModule } from './subsciptions-routing.module';

import { SubsciptionsPage } from './subsciptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubsciptionsPageRoutingModule
  ],
  declarations: [SubsciptionsPage]
})
export class SubsciptionsPageModule {}
