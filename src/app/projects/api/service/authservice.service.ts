import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';

const baseUrl = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new User();

  constructor(private http: HttpClient) { }

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
}
