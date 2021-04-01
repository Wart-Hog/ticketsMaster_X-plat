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
        loadChildren: () => import('../pages/user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('../pages/tickets/tickets.module').then(m => m.TicketsPageModule)
      },
      {
        path: 'edit-user',
        loadChildren: () => import('../pages/edit-user/edit-user.module').then(m => m.EditUserPageModule)
      },
      {
        path: 'new-event',
        loadChildren: () => import('../pages/new-event/new-event.module').then(m => m.NewEventPageModule)
      },
      {
        path: 'delete-event',
        loadChildren: () => import('../pages/delete-event/delete-event.module').then(m => m.DeleteEventPageModule)
      },
      {
        path: 'make-admin',
        loadChildren: () => import('../pages/make-admin/make-admin.module').then( m => m.MakeAdminPageModule)
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
