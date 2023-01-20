import { Component, forwardRef } from '@angular/core';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { PayPalProcessor, OnApprove, OrderRequest } from '../paypal';
// import { OnApproveData, OnApproveActions } from './paypal/types/buttons';
import { OnApproveData, OnApproveActions } from '../paypal';
import { OnCancelData, OnErrorData } from '../paypal/types/buttons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  
})
export class Tab2Page {
  sliderContainer: any = [];
  modelType = 'tv';

  

  constructor(private service: ThemoviedbService) {}

  ngOnInit(): void {
    this.initializeSliderContainer()
  }

  
  initializeSliderContainer() {
    this.service.getTrendingList(this.modelType).subscribe(trendingMoviesE1 => {
      console.log(trendingMoviesE1);
      trendingMoviesE1.results.forEach((trendingMovie: any) => {
        this.sliderContainer.push({
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
