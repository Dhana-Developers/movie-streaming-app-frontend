import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { show } from 'src/app/store/loading/Loading.Actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
  }

  login () {
    this.store.dispatch(show());
    this.router.navigate(['login']);
  }

  register () {
    this.store.dispatch(show());
    this.router.navigate(['register']);
  }
}
