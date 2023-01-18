import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { ProjectComponentModule } from 'src/app/projects/component/project-component/project-component.module';
import { ErrormessageComponent } from 'src/app/projects/component/errormessage/errormessage.component';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  
  ],
  declarations: [LoginPage, ErrormessageComponent]
})
export class LoginPageModule {}
