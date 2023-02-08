import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { StorageService } from '../projects/api/service/storage.service';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { AppState } from '../store/AppState';
import { hide, show } from '../store/loading/Loading.Actions';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user!: any;
  favMovContainer: any = [];
  isPremium: boolean = false;

  constructor(private service: ThemoviedbService,
    private storage: StorageService,
    private store: Store<AppState>,
    private router: Router) {}

  async ngOnInit() {
    await this.storage.get('user').then(resp => {
      console.log(resp);
      console.log(this.router.url);
      
      this.user = resp;
      if (resp.subscription === true) {
        this.isPremium = true;
      }
    })
    this.initializeContainer()
  }

  initializeContainer() {
    this.service.getFav(this.user.id).subscribe(favMoviesE1 => {
      console.log(favMoviesE1);
      
      favMoviesE1.forEach((element: any) => {
        this.favMovContainer.push({
          id: element.id,
          title: element.title,
          description: element.overview,
          premium: element.premium,
          image: element.get_poster,
          modelItem: element
        });
      });    
    });
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
}
