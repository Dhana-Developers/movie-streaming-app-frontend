import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { ModalController } from '@ionic/angular';
import { PasswordresetComponent } from '../../component/passwordreset/passwordreset.component';
import { Router } from '@angular/router';

const baseUrl = 'https://movies.dhanatechnology.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new User();

  constructor(private http: HttpClient,
    private modalController: ModalController,
    private router: Router) { }

  // getLogin(user: any): Observable<any> {
  //   const requestUrl = `${baseUrl}/api/signin/`;
  //   return this.http.post(requestUrl, user);
  // }

  login(logins: any): Observable<User>{
    const requestUrl = `${baseUrl}/api/signin/`;
    return new Observable<any>((observer) =>{
      let resp = this.http.post(requestUrl, logins);
      if (resp){
        observer.next(resp)
      } else {
        observer.error({message: "Invalid username or password"});
        observer.next()
      }
      observer.complete();
    })
      
      // this.http.post(requestUrl, logins).then((resp => {
      //   observer.next(resp)
      // }, (error: any) =>{

      // })
      // setTimeout(() => {
      //   if (resp.code === 1) {
      //     observer.error({message: "Invalid username or password"});
      //     observer.next();
      //   } else {
      //     const user = new User();
      //     user.username = resp.username;
      //     user.id = resp.userId;
      //     user.subscription = resp.subscription;
      //     observer.next(user);
      //   }
      //   observer.complete();
      // }, 3000)
    
  }

  signin(user: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/signin/`;
    return this.http.post(requestUrl, user);
  }

  register(user: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/signup/`;
    return this.http.post(requestUrl, user);
  }

  getUser(id: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/userprofile/${id}`;
    return this.http.get(requestUrl);
  }

  getUsers(): Observable<any> {
    const requestUrl = `${baseUrl}/api/users/`;
    return this.http.get(requestUrl);
  }

  resetPass(info: any): Observable<any> {
    const requestUrl = `${baseUrl}/api/users/passreset/`;
    return this.http.post(requestUrl, info);
  }

  async passResetModal() {
    const modal = await this.modalController.create({
      component: PasswordresetComponent,
      cssClass: 'movie-modal',
    });

    return await modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'close') {
    //   this.router.navigate(['login']);
    // }
  }

  dismissModel() {
    this.modalController.dismiss();
  }
}
