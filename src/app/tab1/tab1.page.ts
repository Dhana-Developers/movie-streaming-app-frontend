import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, SegmentChangeEventDetail, SegmentCustomEvent } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { show, hide } from '../store/loading/Loading.Actions';
import { AppState } from '../store/AppState';
import { Store } from '@ngrx/store';
import { NavigationEnd } from '@angular/router';
import { LoginState } from '../store/login/LoginState';
import { StorageService } from '../projects/api/service/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  user: any;

  modelType = 'movie';
  sliderContainer:any = [];
  genreContainer:any = [];
  popularContainer:any = [];
  selectedGenre: any;
  selectedGenreValue: any;
  filteredGenreId: any;
  loadingCurrentEventData: boolean = false;
  isLoading: boolean = false;
  genreMoviesContainer:any = [];
  isGenreSelected: boolean = false;
  loginState!: LoginState;
  bgImage: string = '/assets/icon/favicon.png';

  constructor(private service: ThemoviedbService,
    private store: Store<AppState>,
    private storage: StorageService
    ) {
    this.genreContainer.map(() => ({
      selected: true,
    }));
    
  }
  

  async ngOnInit() {
    this.initializeSliderContainer();
    this.initializeGenreContainer();
    this.initializeContainer();
    this.store.dispatch(hide());
    await this.storage.get('user').then(resp => {
      console.log(resp);
      this.user = resp;
    });
    
    
  }
  

  initializeSliderContainer() {
    this.service.getTrendingList(this.modelType).subscribe(trendingMoviesE1 => {
      //console.log(trendingMoviesE1);
      trendingMoviesE1.results.forEach((trendingMovie: any) => {
        this.sliderContainer.push({
          id: trendingMovie.id,
          title: trendingMovie.title,
          image: ('http://image.tmdb.org/t/p/original/' + trendingMovie.backdrop_path),
          poster: ('http://image.tmdb.org/t/p/original/' + trendingMovie.poster_path),
          modelItem: trendingMovie
          
        });
        
        
      });
      console.log(this.sliderContainer[0].image);
    });
  }

  initializeGenreContainer() {
    this.service.genreList().subscribe(genreE1 => {
      //console.log(genreE1);
      genreE1.forEach((movieGenre: any) => {
        this.genreContainer.push(movieGenre);
      })
    });
  }

  initializeContainer(){
    this.filteredGenreId = '';
    this.initializePopularContainer();
  }

  initializePopularContainer() {
    this.isLoading = true;
    this.loadingCurrentEventData = true;
    //this.filteredGenreId = '';
    this.service.popularList().subscribe(popularMoviesE1 => {
      //console.log(popularMoviesE1);
      popularMoviesE1.forEach((element: any) => {
        this.popularContainer.push({
          id: element.id,
          title: element.title,
          description: element.overview,
          premium: element.premium,
          image: element.get_poster,
          modelItem: element

        });
      });
      this.isLoading = false;
      this.loadingCurrentEventData = false;
      //this.loadingCurrentEventData.target.complete();
      // if (popularMoviesE1.length === 0) {
      //   this.loadingCurrentEventData.target.disabled = true;
      // }
    });
  }
  
  async genreSelectionChanged(genreEvent: any) {
    const genreE1 = genreEvent.detail.value;
    if (genreE1.length > 0 || this.filteredGenreId != null) {
      // this.popularContainer = [];
      this.filteredGenreId = genreE1.toString();
      console.log(genreE1);
      // console.log(this.filteredGenreId);
      this.genreMoviesContainer = [];
      this.isGenreSelected = true;
      this.selectedGenre = genreE1;
      await this.service.getGenreMovies(genreE1).subscribe(genreMoviesE1 => {
        console.log(genreMoviesE1);
        genreMoviesE1.forEach((element: any) => {
          this.genreMoviesContainer.push({
            id: element.id,
            title: element.title,
            description: element.overview,
            image: element.get_poster,
            premium: element.premium,
            modelItem: element
          });
        });
      });
      this.initializePopularContainer();
    }
  }


  async cardEventListener(modelItem: any) {
    this.store.dispatch(show());
    await forkJoin([this.service.movieDetail(modelItem.id),
    this.service.castList(modelItem.id),
    this.service.crewList(modelItem.id),
    this.service.movieRating(modelItem.id),
    this.service.getVideoList(modelItem.id),
    this.service.getComments(modelItem.id)]).subscribe(responseE1 => {
      modelItem.detailResponseE1 = responseE1[0];
      modelItem.castResponseE1 = responseE1[1];
      modelItem.crewResponseE1 = responseE1[2];
      modelItem.ratingResponse = responseE1[3];
      modelItem.videoResponse = responseE1[4];
      modelItem.commentsResponse = responseE1[5];
      modelItem.idResponse = modelItem.id; 
      this.store.dispatch(hide());
      console.log(responseE1)
      this.service.presentModal(modelItem);
    });
  }

  async selectSegment(index: any, genre: any){
    this.isLoading = true;
    this.genreMoviesContainer = [];
    this.isGenreSelected = true;
    this.selectedGenre = genre.id;
    this.genreContainer.map((item: any) => (item.selected = false));
    this.genreContainer[index].selected = true;
    console.log(genre);
    await this.service.getGenreMovies(genre.id).subscribe(genreMoviesE1 => {
      console.log(genreMoviesE1);
      genreMoviesE1.forEach((element: any) => {
        this.genreMoviesContainer.push({
          id: element.id,
          title: element.title,
          description: element.overview,
          image: element.get_poster,
          premium: element.premium,
          modelItem: element
        });
      });
      this.isLoading = false;
    });
  }
}
