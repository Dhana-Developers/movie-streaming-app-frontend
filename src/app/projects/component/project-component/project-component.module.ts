import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SliderComponent } from '../slider/slider.component';
import { ModelPageComponent } from '../model-page/model-page.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilebarComponent } from '../profilebar/profilebar.component';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { GenreComponent } from '../genre/genre.component';

@NgModule({
  declarations: [CardComponent, SliderComponent, ModelPageComponent, ProfilebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [CardComponent, SliderComponent, ModelPageComponent, ProfilebarComponent]
})
export class ProjectComponentModule { }
