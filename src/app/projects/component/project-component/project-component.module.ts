import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SliderComponent } from '../slider/slider.component';
import { ModelPageComponent } from '../model-page/model-page.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilebarComponent } from '../profilebar/profilebar.component';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { GenreComponent } from '../genre/genre.component';
import { SubscriptionpaypalComponent } from '../subscriptionpaypal/subscriptionpaypal.component';
import { ProfilepopoverComponent } from '../profilepopover/profilepopover.component';
import { PayPalModule } from "../../../paypal/paypal.module";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [CardComponent, SliderComponent, ModelPageComponent, ProfilebarComponent, SubscriptionpaypalComponent, ProfilepopoverComponent],
    exports: [CardComponent, SliderComponent, ModelPageComponent, ProfilebarComponent, SubscriptionpaypalComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PayPalModule
    ]
})
export class ProjectComponentModule { }
