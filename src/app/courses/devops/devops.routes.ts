import { Routes } from '@angular/router';

export const DEVOPS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./landing/devops-landing.component').then(m => m.DevOpsLandingComponent) },
  { path: '01', loadComponent: () => import('./lessons/lesson-01.component').then(m => m.Lesson01Component) },
  { path: '02', loadComponent: () => import('./lessons/lesson-02.component').then(m => m.Lesson02Component) },
  { path: '03', loadComponent: () => import('./lessons/lesson-03.component').then(m => m.Lesson03Component) },
  { path: '04', loadComponent: () => import('./lessons/lesson-04.component').then(m => m.Lesson04Component) },
  { path: '05', loadComponent: () => import('./lessons/lesson-05.component').then(m => m.Lesson05Component) },
  { path: '06', loadComponent: () => import('./lessons/lesson-06.component').then(m => m.Lesson06Component) },
  { path: '07', loadComponent: () => import('./lessons/lesson-07.component').then(m => m.Lesson07Component) },
  { path: '08', loadComponent: () => import('./lessons/lesson-08.component').then(m => m.Lesson08Component) },
  { path: '09', loadComponent: () => import('./lessons/lesson-09.component').then(m => m.Lesson09Component) },
  { path: '10', loadComponent: () => import('./lessons/lesson-10.component').then(m => m.Lesson10Component) },
  { path: '11', loadComponent: () => import('./lessons/lesson-11.component').then(m => m.Lesson11Component) },
  { path: '12', loadComponent: () => import('./lessons/lesson-12.component').then(m => m.Lesson12Component) },
  { path: '13', loadComponent: () => import('./lessons/lesson-13.component').then(m => m.Lesson13Component) },
  { path: '14', loadComponent: () => import('./lessons/lesson-14.component').then(m => m.Lesson14Component) },
];
