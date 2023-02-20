import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { DashboardPage } from '../adminpgs/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../adminpgs/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('../adminpgs/movies/movies.module').then( m => m.MoviesPageModule)
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('../adminpgs/subsciptions/subsciptions.module').then( m => m.SubsciptionsPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../adminpgs/users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
