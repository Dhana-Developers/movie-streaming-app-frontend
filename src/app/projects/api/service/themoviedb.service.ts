import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelPageComponent } from '../../component/model-page/model-page.component';

const apiKey = environment.apiKey;
const baseUrl = 'http://localhost:8000';



@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {
  currentModel: any[] = [];

  constructor(private http: HttpClient, public modalController: ModalController) { }

  getGenreMovies(id: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/genres/${id}`;;
    return this.http.get(requestUrl);
  }

  genreList(): Observable<any> {
    const requestUrl = `${baseUrl}/api/genres/`;
    return this.http.get(requestUrl)
  }


  getTrendingList(type: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestUrl);
  }


  getPopularList(type: string, page: number, genres: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genres}`;
    return this.http.get(requestUrl);
  }

  popularList(): Observable<any> {
    const requestUrl = `${baseUrl}/api/popular/`;
    return this.http.get(requestUrl);
  }

  getDetailList(type: string, id: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestUrl);
  }

  movieDetail(id: string): Observable<any> {
    const requestUrl = `${baseUrl}/api/movie/${id}`;
    return this.http.get(requestUrl);
  }

  getCreditList(type: string, id: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestUrl);
  }
  
  castList(id: string): Observable<any> {
    const requestUrl = `${baseUrl}/api/cast/${id}`;
    return this.http.get(requestUrl);
  }

  crewList(id: string): Observable<any> {
    const requestUrl = `${baseUrl}/api/crew/${id}`;
    return this.http.get(requestUrl);
  }

  movieRating(id: string): Observable<any> {
    const requestUrl = `${baseUrl}/api/rating/${id}`;
    return this.http.get(requestUrl);
  }

  getVideoList(id: string): Observable<any> {
    const requestUrl = `${baseUrl}/api/video/${id}`;
    return this.http.get(requestUrl);
  }

  postComment(comment: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/addcomment/`;
    return this.http.post(requestUrl, comment);
  }
  
  getComments(id: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/comment/${id}`;
    return this.http.get(requestUrl);
  }

  async presentModal(modelItem: any) {
    const modal = await this.modalController.create({
      component: ModelPageComponent,
      cssClass: 'myModal',
      componentProps: {
        modelItemList: modelItem
      }
    });

    this.currentModel.push(modal);
    return await modal.present();
  }

  dismissModel() {
    this.currentModel[this.currentModel.length - 1].dismiss().then(() =>{
       this.currentModel.pop();
    });
  }

}

