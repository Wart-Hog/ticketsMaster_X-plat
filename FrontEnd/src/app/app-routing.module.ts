import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./components/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./components/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./components/tickets/tickets.module').then( m => m.TicketsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
