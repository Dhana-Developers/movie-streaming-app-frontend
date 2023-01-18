import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() sliderInputValue: any;
  @Output() sliderEventTrigger: EventEmitter<any> = new EventEmitter();
  isSmallSizeScreen!: boolean;
  slideOpts: any;
  

  constructor(public platform: Platform) { }

  ngOnInit() {
    this.plateFormCheck();
    this.platform.resize.subscribe(async () => {
      this.plateFormCheck();
    });
  }

  plateFormCheck() {
    if (this.platform.width() < 427){
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1,
        duration: 500
      };
      this.isSmallSizeScreen = true;
    }else if (this.platform.width() < 640 && this.platform.width() > 427) {
      this.slideOpts ={
        spaceBetween: 2,
        slidesPerView: 2,
        duration: 500
      };
      this.isSmallSizeScreen = true;
    }else if (this.platform.width() < 854 && this.platform.width() > 640) {
      this.slideOpts ={
        spaceBetween: 2,
        slidesPerView: 2,
        duration: 500
      };
      this.isSmallSizeScreen = true;
    }else if (this.platform.width() < 1300 && this.platform.width() > 1200) {
      this.slideOpts ={
        spaceBetween: 2,
        slidesPerView: 1,
        duration: 500
      };
      this.isSmallSizeScreen = false;
    }else if (this.platform.width() < 1200) {
      this.slideOpts = {
        spaceBetween: 1,
        slidesPerView: 3.2,
        duration: 500
      };
      this.isSmallSizeScreen = true;
    }else {
      this.isSmallSizeScreen = false;
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1.5,
        duration: 500
      };
    }
  }

  sliderClickEventTrigger(modelValue: any) {
    this.sliderEventTrigger.emit(modelValue);
  }

}
