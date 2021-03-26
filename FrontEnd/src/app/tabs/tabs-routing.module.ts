import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'user',
        loadChildren: () => import('../components/user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../components/events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../components/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../components/favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('../components/tickets/tickets.module').then(m => m.TicketsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
