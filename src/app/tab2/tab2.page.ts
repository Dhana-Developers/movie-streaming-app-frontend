import { Component, forwardRef } from '@angular/core';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { PayPalProcessor, OnApprove, OrderRequest } from '../paypal';
// import { OnApproveData, OnApproveActions } from './paypal/types/buttons';
import { OnApproveData, OnApproveActions } from '../paypal';
import { OnCancelData, OnErrorData } from '../paypal/types/buttons';
import { StorageService } from '../projects/api/service/storage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  
})
export class Tab2Page {
  sliderContainerMov: any = [];
  sliderContainerTv: any = [];
  modelType1 = 'movie';
  modelType2 = 'tv';
  user!: any;
  isPremium: boolean = false;

  constructor(private service: ThemoviedbService,
    private storage: StorageService) {}

  async ngOnInit() {
    await this.storage.get('user').then(resp => {
      console.log(resp);
      this.user = resp;
      if (resp.subscription === true) {
        this.isPremium = true;
      }
    })
    this.initializeSliderContainer()
  }

  
  initializeSliderContainer() {
    forkJoin([this.service.getTrendingMov(this.modelType1), this.service.getTrendingTv(this.modelType2)]).subscribe(trendingMoviesE1 => {
      console.log(trendingMoviesE1);
      trendingMoviesE1[0].results.forEach((trendingMovie: any) => {
        this.sliderContainerMov.push({
          id: trendingMovie.id,
          title: trendingMovie.title,
          image: ('http://image.tmdb.org/t/p/original/' + trendingMovie.backdrop_path),
          poster: ('http://image.tmdb.org/t/p/original/' + trendingMovie.poster_path),
          modelItem: trendingMovie
        });
      });
      trendingMoviesE1[1].results.forEach((trendingMovie: any) => {
        this.sliderContainerTv.push({
          id: trendingMovie.id,
          title: trendingMovie.name,
          image: ('http://image.tmdb.org/t/p/original/' + trendingMovie.backdrop_path),
          poster: ('http://image.tmdb.org/t/p/original/' + trendingMovie.poster_path),
          modelItem: trendingMovie
        });
      });
    });
  }

}
