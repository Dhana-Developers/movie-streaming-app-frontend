import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { AppState } from 'src/app/store/AppState';
import { LoginState } from 'src/app/store/login/LoginState';

import { ThemoviedbService } from '../../api/service/themoviedb.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {

  @Input() modelItemList!: any;
  @Input() modelType!: string;

  videoUrl!: string;
  preload = 'auto';

  isLoading!: boolean;
  id!: string;
  title!: string;
  backGroundImage!: string;
  releaseDate!: string;
  overview!: string;
  castItemList: any = [];
  crewItemList: any = [];
  commentsContainer: any = [];
  chunksList: any = [];
  likes: any;
  dislikes: any;
  runtime!: string;
  isVideoEnabled!: boolean;
  comment: any;
  loginState!: LoginState;

  constructor(private service: ThemoviedbService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('login').subscribe(loginstate => {
      this.loginState = loginstate;
      console.log(loginstate.user);
      
    });
    this.initializeContainer();
  }

  initializeContainer() {
    this.isVideoEnabled = false;
    this.isLoading = true;
    this.title = this.modelItemList.detailResponseE1.title; 
    this.id = this.modelItemList.detailResponseE1.id;
    this.backGroundImage = this.modelItemList.detailResponseE1.get_poster;
    this.overview = this.modelItemList.detailResponseE1.overview;
    this.releaseDate = this.modelItemList.detailResponseE1.release_date;
    this.runtime = this.modelItemList.detailResponseE1.runtime + 'minutes';
    this.likes = this.modelItemList.ratingResponse.likes;
    this.dislikes = this.modelItemList.ratingResponse.dislikes;

    this.modelItemList.crewResponseE1.forEach((element: any) => {
      this.crewItemList.push(element);
    });

    this.modelItemList.castResponseE1.forEach((element: any) => {
      this.castItemList.push(element);
    });

    this.modelItemList.commentsResponse.forEach((element: any) => {
      this.commentsContainer.push(element);
    })

    if (this.modelItemList.videoResponse.get_video1 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video1)
    }
    if (this.modelItemList.videoResponse.get_video2 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video2)
    }
    if (this.modelItemList.videoResponse.get_video3 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video3)
    }
    if (this.modelItemList.videoResponse.get_video4 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video4)
    }
    if (this.modelItemList.videoResponse.get_video5 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video5)
    }
    if (this.modelItemList.videoResponse.get_video6 !== null){
      this.chunksList.push(this.modelItemList.videoResponse.get_video6)
    }

    this.videoUrl = this.chunksList[0];
    this.isLoading = false;
    //this.initializeRecommendationsContainer();
  }

  // initializeRecommendationsContainer(){
  //   this.service.getRecommendationList(this.modelType, this.id).subscribe(responseE1 => {
  //     responseE1.results.forEach(element => {
  //       this.recommendationContainer.push({
  //         id: element.id,
  //         title: element.title,
  //         description: element.overview,
  //         image: ('http://image.tmdb.org/t/p/original/' + element.backdrop_path),
  //         voterRating: element.vote_average,
  //         modelItem: element
  //       });
  //     });
  //     this.isLoading = false;

  //   });
  // }

  // cardEventListener(modelItem) {
  //   this.isVideoEnabled = false;
  //   forkJoin([this.service.getDetailList(this.modelType, modelItem.id),
  //   this.service.getCreditList(this.modelType, modelItem.id)]).subscribe(responseE1 => {
  //     modelItem.detailResponseE1 = responseE1[0];
  //     modelItem.creditResponseE1 = responseE1[1];
  //     //modelItem.videos = responseE1[2];
  //     console.log(responseE1)
  //     this.service.presentModal(modelItem, this.modelType);
  //   });
  // }

  closeModel() {
    this.service.dismissModel();
  }

  playVideo() {
    this.isVideoEnabled = true;
  }

  getLoadedData(evt: any) {
    let currentIndex = this.chunksList.indexOf(this.videoUrl);
    this.videoUrl = this.chunksList[currentIndex + 1];
    console.log(this.videoUrl);
    //this.videoUrl = 'https://movietrailers.apple.com/movies/lionsgate/john-wick-chapter-4/john-wick-chapter-4-trailer-2_h480p.mov';
    console.log(evt);
    
  }

  submitComment() {
    let com = {
      "user_id": this.loginState.user.id,
      "movie_id": this.id,
      "comment": this.comment
    }
    this.service.postComment(com).subscribe(resp => {
      console.log(resp);
      this.commentsContainer.push(resp);
    })
  }

}
