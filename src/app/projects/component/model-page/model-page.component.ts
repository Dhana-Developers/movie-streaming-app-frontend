import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { AppState } from 'src/app/store/AppState';
import { LoginState } from 'src/app/store/login/LoginState';
import { StorageService } from '../../api/service/storage.service';
import { AlertController } from '@ionic/angular';
import { ThemoviedbService } from '../../api/service/themoviedb.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {

  @Input() modelItemList!: any;
  @Input() modelType!: string;
  @Input() favUrl!: boolean;
  
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
  views: any;
  isPremium!: boolean;
  user: any;
  subscribed!: boolean;

  likechip: string = 'dark';
  dislikechip: string = 'dark';
  likeicon: string = 'thumbs-up-outline';
  dislikeicon: string = 'thumbs-down-outline';
  viewchip: string = 'dark';
  viewicon: string = 'eye-outline';

  constructor(private service: ThemoviedbService,
    private router: Router,
    private storage: StorageService,
    private alertController: AlertController) { }

  async ngOnInit() {
    await this.storage.get('user').then(user => {
      this.user = user;
      this.subscribed = this.user.subscription
      console.log(user);
      let rout = this.router.url;
      console.log(rout);
      
      if (rout === '/tabs/favorite') {
        this.favUrl = true;
      }else {
        this.favUrl = false;
      }
    });
    this.initializeContainer();
  }

  initializeContainer() {
    this.isVideoEnabled = false;
    this.isLoading = true;
    this.title = this.modelItemList.detailResponseE1.title; 
    this.id = this.modelItemList.detailResponseE1.id;
    this.isPremium = this.modelItemList.detailResponseE1.premium;
    this.backGroundImage = this.modelItemList.detailResponseE1.get_poster;
    this.overview = this.modelItemList.detailResponseE1.overview;
    this.releaseDate = this.modelItemList.detailResponseE1.release_date;
    this.runtime = this.modelItemList.detailResponseE1.runtime + 'minutes';
    this.likes = this.modelItemList.ratingResponse.likes;
    this.dislikes = this.modelItemList.ratingResponse.dislikes;
    this.views = this.modelItemList.ratingResponse.views;

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
    this.service.addView(this.id).subscribe(resp => {
      console.log(resp);
      
      if (resp.code === 0) {
        this.views += 1;
        this.viewchip = 'secondary';
        this.viewicon= 'eye';
      } else {
        console.log('server error');
        
      }
    })
  }

  subscribe() {
    this.router.navigate(['subscribe']);
    this.closeModel();
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
      "user_id": this.user.id,
      "movie_id": this.id,
      "comment": this.comment
    }
    this.service.postComment(com).subscribe(resp => {
      console.log(resp);
      this.commentsContainer.push(resp);
    })
  }

  like(id: any) {
    this.service.addLike(id).subscribe(resp => {
      console.log(resp);
      if (resp.code === 0) {
        this.likes += 1;
        this.likechip = 'success';
        this.likeicon = 'thumbs-up';
      } else {
        console.log('server error');
        
      }
    })
  }

  unlike(id: any) {
    this.service.disLike(id).subscribe(resp => {
      console.log(resp);
      if (resp.code === 0) {
        this.dislikes += 1;
        this.dislikechip = 'danger';
        this.dislikeicon = 'thumbs-down';
      } else {
        console.log(resp.error);
      }
    })
  }

  async addToFavorite() {
    const info = {
      "movieid": this.id,
      "userid": this.user.id
    }
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Important message',
      cssClass: 'custom-alert',
      message: 'Movie added to favorites',
      buttons: ['OK'],
    });
    const alerterr = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Important message',
      cssClass: 'custom-alert',
      message: 'Movie already in favorites',
      buttons: ['OK'],
    });
    console.log(info);
    await this.service.addFav(info).subscribe(resp =>{
      console.log(resp);
      if (resp.code == 0) {
        alert.present();
      }else {
        alerterr.present();
      }
    })
  }

}
