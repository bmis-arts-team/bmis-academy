import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'courses/devops',
        loadChildren: () => import('./courses/devops/devops.routes').then(m => m.DEVOPS_ROUTES)
      },
      {
        path: 'courses/architecte-backend',
        loadChildren: () => import('./courses/architecte/architecte.routes').then(m => m.ARCHITECTE_ROUTES)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
      }
    ]
  }
];
