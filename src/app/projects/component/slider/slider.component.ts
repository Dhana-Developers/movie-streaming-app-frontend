import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  swiperModules = [IonSlides];
  @ViewChild('swiper') swiper!: SliderComponent;
  @Input() slider1InputValue: any;
  @Input() slider2InputValue: any;
  // @Output() sliderEventTrigger: EventEmitter<any> = new EventEmitter();
  // isSmallSizeScreen!: boolean;
  config: SwiperOptions = {
    slidesPerView: 2
  }
  

  constructor(public platform: Platform) { 
    const swiper = new Swiper('.swiper', {
      // Install modules
      modules: [Navigation, Pagination, Scrollbar],
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // ...
    });
  }

  ngOnInit() {
    
  }


}
