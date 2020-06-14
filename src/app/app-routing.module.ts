import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login-register',
    pathMatch: 'full'
  },
  {
    path: 'login-register',
    loadChildren: () => import('./pages/login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'aarti-details',
    loadChildren: () => import('./pages/aarti-details/aarti-details.module').then( m => m.AartiDetailsPageModule)
  },
  {
    path: 'aarti-list',
    loadChildren: () => import('./pages/aarti-list/aarti-list.module').then( m => m.AartiListPageModule)
  },
  {
    path: 'aarti-reorder',
    loadChildren: () => import('./pages/aarti-reorder/aarti-reorder.module').then( m => m.AartiReorderPageModule)
  },
  {
    path: 'create-playlist',
    loadChildren: () => import('./pages/create-playlist/create-playlist.module').then( m => m.CreatePlaylistPageModule)
  },
  {
    path: 'my-playlist',
    loadChildren: () => import('./pages/my-playlist/my-playlist.module').then( m => m.MyPlaylistPageModule)
  },
  {
    path: 'error-page',
    loadChildren: () => import('./pages/error-page/error-page.module').then( m => m.ErrorPagePageModule)
  },
  {
    path: 'my-playlist-artilist',
    loadChildren: () => import('./pages/my-playlist-artilist/my-playlist-artilist.module').then( m => m.MyPlaylistArtilistPageModule)
  }, 
  {
    path: 'update-user-playlist',
    loadChildren: () => import('./pages/update-user-playlist/update-user-playlist.module').then( m => m.UpdateUserPlaylistPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
